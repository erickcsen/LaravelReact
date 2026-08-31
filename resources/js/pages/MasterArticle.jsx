import { useState, useEffect } from "react";
import NavBar from "./Layouts/NavbarMenu"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link, useParams, useNavigate, data } from "react-router-dom"
import Form from 'react-bootstrap/Form'

import api from "../api";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { OrbitProgress, Commet, Atom, BlinkBlur } from "react-loading-indicators";

export default function MasterArticle() {
    const { page, parameter_id } = useParams();
    const [id, setID] = useState(parameter_id);
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const [category_list, setCategory] = useState((window.AppData.category)?window.AppData.category:[]);
    useEffect(() => {
        api.get("/category/list", {
            withCredentials: true,
        })
        .then((response) => {
            setCategory(response.data);
        })
        .catch(() => setAuthenticated(false));
    }, []);

    window.AppData.category = category_list;


    const [form, setForm] = useState({
        title:"",
        content:"",
        user:(window.AppData.user)?window.AppData.user.id:"",
        image:null,
        category:"",
        statusCategory:"",
        defaultImg:""
    });

    var [defaultImg, setDefaultImg] = useState("");

    const [errors, setErrors] = useState({
        title:"", category:"", content:"", statusCategory:"", image:""
    })

    const url = {
        store:"/master-articles",
        update:"/master-articles/update"
    };
    const [content, setContent] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({...form, id:id});

        const formData = new FormData();
        if (page) formData.append("id", id);
        formData.append("title", form.title);
        formData.append("content", form.content);
        formData.append("user", form.user);
        if(form.image != null) formData.append("image", form.image);
        formData.append("category", form.category);
        formData.append("statusCategory", form.statusCategory);

        await api.get("/sanctum/csrf-cookie");
        try {
            const str_url = (page=="create")? url.store : url.update;
            const response = (page=="create")? await api.post(str_url, formData): await api.put(str_url, formData);
            navigate("/master-articles");

            form.title = "";
            form.content = "";
            form.image = null;
            form.category = "";
            form.statusCategory = "";

            // setShowToast(true);
            setErrors({});
            // navigate("/");
        } catch (error) {
            if (error.response.status !== 500) {
                setShowToast(true);

                const error_message = error.response.data.errors;
                const errors = {title:error_message.title, category:error_message.category, content:error_message.content, message:error.response.data.message, image:error_message.image};

                console.error({error_message:error_message});
                console.error({errors:errors});
                setErrors(errors);
            } else {
                console.log(error.response)
                setErrors({message:error.response.data.message});
            }
        }
        /** */
    }

    const domain = window.location.origin;
    const [loading, setLoading] = useState(true);
    const [loadingDataWithPagination, setLoadingDataWithPagination] = useState(true);
    const [dataArticleWithPagination, setDataArticleWithPagination] = useState([]);
    const [dataArticle, setDataArticle] = useState({data:[]});
    const [urlGetArticles, setUrlGetArticles] = useState("/master-articles/article/list");

    useEffect(() => {handlePagination()});
    useEffect(() => {getDataArticle()});

    const getDataArticle = async (e)=>{
        if (loading && id != null)
            api.get(urlGetArticles, {
                withCredentials: true, params:{id}
            })
            .then((response) => {
                console.log({dataWithID:response});
                setDataArticle(response.data);
                if(response.data)
                    if(response.data)
                        if(response.data.data.length > 0)
                            setDefaultImg(domain+"/"+response.data.data[0].image_url);
            }).catch((errors)=>{
                console.log(errors);
            }).finally(()=>{
                setLoading(false);
            })
    }

    const handlePagination = async (e)=>{
        if (loadingDataWithPagination)
            api.get(urlGetArticles, {
                withCredentials: true,
            })
            .then((response) => {
                console.log({dataWithPagination:response});
                setDataArticleWithPagination(response.data);
            }).catch((errors)=>{
                console.log(errors);
            }).finally(()=>{
                setLoadingDataWithPagination(false);
            });
    }

    if (page=="create"){
        document.title = "Master Article - New Article";
        return (<>
            <NavBar/>
            <Container>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <sup><Link to="/master-articles" style={{textDecoration:"none"}}>Master Articles</Link> &gt; New Article </sup> <br />
                            <b className="h5">
                                New Article
                            </b>
                        </Col>
                        <Col className="d-none d-md-block">
                            <button type="submit" className="btn btn-primary float-end">Save Article</button>
                        </Col>
                        <div className="position-fixed end-0 start-0 bottom-0 border py-2 bg-white d-block d-md-none" style={{zIndex:"1000"}}>
                            <button type="submit" className="btn btn-primary">Save Article</button>
                            <Link to="/master-articles" className="btn btn-danger ms-3">Cancel</Link>
                        </div>
                    </Row>
                    <Row>
                        <Col className="pt-3">
                            <input type="hidden" value={csrfToken}/>
                            <Row>
                                <Col xs="12" md="8" lg="9">
                                    <label>Title</label>
                                    <div className="input-group">
                                        <Form.Control type="text" placeholder="Input title" isInvalid={!!errors.title} defaultValue={form.title} onChange={(e) => {setForm({...form, title: e.target.value}); setErrors({...errors, title:""})}}/>
                                    </div>
                                    {errors.title && <div className="text-danger">{errors.title[0]}</div>}
                                </Col>
                                <Col xs="12" md="4" lg="3">
                                    <label>Category</label>
                                    <div className="input-group">
                                        <Form.Select onChange={(e) => {setForm({...form, category: e.target.value, statusCategory: (e.target.value=="New")?e.target.value:""});setErrors({...errors, category:""})}} isInvalid={!!errors.category} className={(form.statusCategory=="New")?"d-none":"rounded"} style={{textTransform:"capitalize"}}>
                                            <option key={0} value="">-- Select Category --</option>
                                            <option key={1} value="New">-- New Category --</option>
                                            {category_list.map((item, index)=>(
                                                <option key={index+1} value={item.id} style={{textTransform:"capitalize"}}>{item.title}</option>
                                            ))}
                                        </Form.Select>
                                        <input onChange={(e) => {setForm({...form, category: e.target.value});setErrors({...errors, category:""})}} className={(form.statusCategory=="New")?"form-control rounded":"form-control d-none"} placeholder="Input new Category"/>
                                    </div>
                                    {errors.category && <div className="text-danger">{errors.category[0]}</div>}
                                </Col>
                                <Col xs="12" className={!errors.content ? "mt-1" : "mt-1"}>
                                    <label>Banner</label>
                                    <div className="input-group">
                                        <Form.Control type="file" accept="image/*" onChange={(e)=>{setForm({...form, image: (e.target.files.length > 0)?e.target.files[0]:e.target.value}); setErrors({...errors, image:""})}} isInvalid={!!errors.image} />
                                    </div>
                                    {errors.image && <div className="text-danger">{errors.image[0]}</div>}
                                </Col>
                                <Col className={!errors.content ? "mt-3" : "mt-1"} style={{paddingBottom:"66px"}}>
                                    {errors.content && <div className="text-danger">{errors.content[0]}</div>}
                                    <Col className="p-0" style={(errors.content)?{border:"solid 1px red"}:{}}>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={content}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setForm({...form, content: data})
                                                setErrors({...errors, content:""})
                                            }}
                                        />
                                    </Col>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </form>
            </Container>
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={10000}
                    autohide
                    bg={errors.message ? "danger" : "success"}
                >
                    <Toast.Header>
                        <strong className="me-auto">{errors.message ? "Insert Articles Failed" : "Info"}</strong>
                    </Toast.Header>

                    <Toast.Body className="text-white">
                        {errors.message ? errors.message : "Insert Articles Successful."}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>);
    }
    else if (page=="edit"){
        document.title = "Master Article - Edit Article";

        if (loading) // Loading Dapatkan Data Article
            return <>
                <NavBar />
                <Container>
                    <Row>
                        <Col>
                            <sup><Link to="/master-articles" style={{textDecoration:"none"}}>Master Articles</Link> &gt; Article </sup> <br />
                            <h1 className="text-center" style={{marginTop:"10vh"}}>
                                <BlinkBlur color="#ffac00" size="large" text="Loading" textColor="" /> <br />
                            </h1>
                        </Col>
                    </Row>
                </Container>
            </>
        else if(dataArticle.data.length > 0 == true) // Kalau ada data article
            return (<>
                <NavBar/>
                <Container>
                    <form onSubmit={handleSubmit}>
                        <Row>
                            {dataArticle.data.map((data)=>{
                                form.title=data.title;
                                form.category = data.category_id;
                                form.defaultImg = domain+"/"+data.image_url;
                                if (form.content=="") {
                                    setContent(data.description);
                                    form.content = data.description;
                                }
                            })}
                            <Col>
                                <sup><Link to="/master-articles" style={{textDecoration:"none"}}>Master Articles</Link> &gt;
                                <Link to={"/master-articles/article/"+id} style={{textDecoration:"none"}}>{form.title}</Link> &gt;
                                Edit Article </sup> <br />
                                <b className="h5">
                                    Edit Article
                                </b>
                            </Col>
                            <Col className="d-none d-lg-block">
                                <button type="submit" className="btn btn-primary float-end">Save Article</button>
                            </Col>
                            <div className="position-fixed end-0 start-0 bottom-0 border py-2 bg-white d-block d-lg-none" style={{zIndex:"1000"}}>
                                <button type="submit" className="btn btn-primary">Save Article</button>
                                <Link to="/master-articles" className="btn btn-danger ms-3">Cancel</Link>
                            </div>
                        </Row>
                        <Row>
                            <Col xs={12} md={12} lg={5} xl={4}>
                                <div
                                    style={{
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <div style={{textAlign:"center"}}>
                                        <img
                                            src={defaultImg}
                                            width="100%"
                                            className="rounded"
                                            alt=""
                                        /> <br/>
                                        <label className="btn btn-light mt-3" htmlFor="banner">
                                            Change Image
                                        </label>
                                    </div>
                                </div>
                            </Col>
                            <Col className="pt-3" xs={12} md={12} lg={7} xl={8}>
                                <input type="hidden" value={csrfToken}/>
                                <Row>
                                    <Col xs="12" md="8" lg="9">
                                        <label>Title</label>
                                        <div className="input-group">
                                            <Form.Control type="text" placeholder="Input title" isInvalid={!!errors.title} defaultValue={form.title} onChange={(e) => {setForm({...form, title: e.target.value}); setErrors({...errors, title:""})}}/>
                                        </div>
                                        {errors.title && <div className="text-danger">{errors.title[0]}</div>}
                                    </Col>
                                    <Col xs="12" md="4" lg="3">
                                        <label>Category</label>
                                        <div className="input-group">
                                            <Form.Select onChange={(e) => {setForm({...form, category: e.target.value, statusCategory: (e.target.value=="New")?e.target.value:""});setErrors({...errors, category:""})}} isInvalid={!!errors.category} className={(form.statusCategory=="New")?"d-none":"rounded"} style={{textTransform:"capitalize"}} value={form.category}>
                                                <option key={0} value="">-- Select Category --</option>
                                                <option key={1} value="New">-- New Category --</option>
                                                {category_list.map((item, index)=>{
                                                    return <option key={index+1} value={item.id} style={{textTransform:"capitalize"}}>{item.title}</option>
                                                })}
                                            </Form.Select>
                                            <input onChange={(e) => {setForm({...form, category: e.target.value});setErrors({...errors, category:""})}} className={(form.statusCategory=="New")?"form-control rounded":"form-control d-none"} placeholder="Input new Category"/>
                                        </div>
                                        {errors.category && <div className="text-danger">{errors.category[0]}</div>}
                                    </Col>
                                    <Col xs="12" className="mt-1 d-none">
                                        <label>Banner</label>
                                        <div className="input-group">
                                            <Form.Control id="banner" type="file" accept="image/*" onChange={(e)=>{setForm({...form, image: (e.target.files.length > 0)?e.target.files[0]:e.target.value}); setDefaultImg(URL.createObjectURL(e.target.files[0])); setErrors({...errors, image:""})}} isInvalid={!!errors.image} />
                                        </div>
                                        {errors.image && <div className="text-danger">{errors.image[0]}</div>}
                                    </Col>
                                    <Col className={!errors.content ? "mt-3" : "mt-1"} style={{paddingBottom:"66px"}}>
                                        {errors.content && <div className="text-danger">{errors.content[0]}</div>}
                                        <Col className="p-0" style={(errors.content)?{border:"solid 1px red"}:{}}>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={content}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setForm({...form, content: data})
                                                    setErrors({...errors, content:""})
                                                }}
                                            />
                                        </Col>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </form>
                </Container>
                <ToastContainer position="top-end" className="p-3">
                    <Toast
                        onClose={() => setShowToast(false)}
                        show={showToast}
                        delay={10000}
                        autohide
                        bg={errors.message ? "danger" : "success"}
                    >
                        <Toast.Header>
                            <strong className="me-auto">{errors.message ? "Insert Articles Failed" : "Info"}</strong>
                        </Toast.Header>

                        <Toast.Body className="text-white">
                            {errors.message ? errors.message : "Insert Articles Successful."}
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            </>);
        else if(id != null && dataArticle.data.length > 0 == false) return <>
            <NavBar/>
            <Container>
                <Row>
                    <Col>
                        <sup><Link to="/master-articles" style={{textDecoration:"none"}}>Master Articles</Link> &gt; Article </sup> <br />
                        <Row>
                            <p className="text-center" style={{marginTop:"10vh",fontSize:"14pt"}}>
                                <i className="fa fa-filter" style={{fontSize:"100px"}}></i><br/>
                                <b>
                                    Tidak Ada Data
                                </b> <br />
                                <Link to="/master-articles">
                                    <Button className="btn btn-light border mt-3">Back</Button>
                                </Link>
                            </p>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    }else if (page=="article"){
        document.title = "Master Article - Read Article";
        if (id==null) navigate("/master-articles");

        if (loading) // Loading Dapatkan Data Article
            return <>
                <NavBar />
                <Container>
                    <Row>
                        <Col>
                            <sup><Link to="/master-articles" style={{textDecoration:"none"}}>Master Articles</Link> &gt; Article </sup> <br />
                            <h1 className="text-center" style={{marginTop:"10vh"}}>
                                <BlinkBlur color="#ffac00" size="large" text="Loading" textColor="" /> <br />
                            </h1>
                        </Col>
                    </Row>
                </Container>
            </>
        else if(dataArticle.data.length > 0 == true) // Kalau ada data article
            return <>
                <NavBar/>
                <Container>
                    <Row>
                        {dataArticle.data.map((data) => {
                            return <Col key={data.id}>
                                <sup><Link to="/master-articles" style={{textDecoration:"none"}}>Master Articles</Link> &gt; {data.title} </sup> <br />
                                <Row>
                                    <Col xs={12}>
                                        <div className="container mt-3 d-none d-md-block" style={{position:"absolute",left:"0",right:"0"}}>
                                            <div style={{float:"right"}}>
                                                <Link to={"/master-articles/edit/"+data.id+""}>
                                                    <Button className="btn btn-light border">
                                                        <i className="fa fa-edit"></i> Edit
                                                    </Button>
                                                </Link> &nbsp;
                                                <Button className="btn btn-danger">
                                                    <i className="fa fa-trash"></i> Delete
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="position-fixed end-0 start-0 bottom-0 border py-2 bg-white d-block d-md-none px-3" style={{zIndex:"1000"}}>
                                            <div style={{float:"left"}}>
                                                <Link to="/master-articles" className="btn btn-light border">
                                                    <i className="fa fa-angle-left"></i> Back
                                                </Link>
                                            </div>
                                            <div style={{float:"right"}}>
                                                <Link to={"/master-articles/edit/"+data.id+""}>
                                                    <Button className="btn btn-light border">
                                                        <i className="fa fa-edit"></i> Edit
                                                    </Button>
                                                </Link> &nbsp;
                                                <Button className="btn btn-danger">
                                                    <i className="fa fa-trash"></i> Delete
                                                </Button>
                                            </div>
                                        </div>
                                        <div style={{background:"url('"+domain + "/" + data.image_url+"')",height:"300px",backgroundSize:"auto 100%",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}>
                                        </div>
                                    </Col>
                                    <Col xs={12} style={{paddingBottom:"66px"}}>
                                        <h3 className="mt-2">{data.title}</h3>
                                        <div dangerouslySetInnerHTML={{__html:data.description}}>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        })}
                    </Row>
                </Container>
            </>
        else if(id != null && dataArticle.data.length > 0 == false) // Kalau tidak ada data
            return <>
                <NavBar/>
                <Container>
                    <Row>
                        <Col>
                            <sup><Link to="/master-articles" style={{textDecoration:"none"}}>Master Articles</Link> &gt; Article </sup> <br />
                            <Row>
                                <p className="text-center" style={{marginTop:"10vh",fontSize:"14pt"}}>
                                    <i className="fa fa-filter" style={{fontSize:"100px"}}></i><br/>
                                    <b>
                                        Tidak Ada Data
                                    </b> <br />
                                    <Link to="/master-articles">
                                        <Button className="btn btn-light border mt-3">Back</Button>
                                    </Link>
                                </p>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
    }
    else { // Show Data Articles in Master Articles
        document.title = "Master Article";
        if (loadingDataWithPagination) // Loading Dapatkan Data Article
            return <>
                <NavBar />
                <Container>
                    <Row>
                        <Col>
                            <b className="h5">
                                Master Article
                            </b>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to="/master-articles/create" className="btn btn-primary mt-3">New Article</Link>
                        </Col>
                        <h1 className="text-center" style={{marginTop:"10vh"}}>
                            <BlinkBlur color="#ffac00" size="large" text="Loading" textColor="" /> <br />
                        </h1>
                    </Row>
                </Container>
            </>
        else if(dataArticleWithPagination.data.length > 0 == true) // Kalau ada data article
            return (
                <>
                    <NavBar />
                    <Container>
                        <Row>
                            <Col>
                                <b className="h5">
                                    Master Article
                                </b>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Link to="/master-articles/create" className="btn btn-primary mt-3">New Article</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-3">
                                <Row>
                                    {dataArticleWithPagination.data.map((data) => (
                                        <Col xs="12" md="6" lg="3" key={data.id} className="pt-3">
                                            <Link to={"/master-articles/article/"+""+data.id} style={{textDecoration:"none",color:"inherit"}} onClick={(e)=>{setLoading(true);setID(data.id);getDataArticle();}}>
                                                <div className="border">
                                                    <div>
                                                        <div style={{backgroundImage:"url("+domain+'/'+data.image_url+")", height:"200px", backgroundSize:"100% 100%"}}></div>
                                                    </div>
                                                    <div className="p-2">
                                                        <b style={{fontSize:"large"}} className="text-limit-title-card"> {data.title} </b>
                                                        <div className="mt-2 text-limit" dangerouslySetInnerHTML={{__html: data.description}}></div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-3 mb-3" style={{textAlign:"center"}}>
                                {dataArticleWithPagination.links.map((data)=>{
                                    return <Button type="button" dangerouslySetInnerHTML={{__html: data.label}} className="btn btn-light border me-1" onClick={(e)=>{setLoading(true); if (data.url != null) setUrlGetArticles(data.url);handlePagination(e)}} key={data.label}>
                                        </Button>
                                })}
                            </Col>
                        </Row>
                    </Container>
                </>
            )
        else // Kalau tidak ada data article
            return <>
                <NavBar />
                <Container>
                    <Row>
                        <Col>
                            <b className="h5">
                                Master Article
                            </b>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to="/master-articles/create" className="btn btn-primary mt-3">New Article</Link>
                        </Col>
                        <p className="text-center" style={{marginTop:"10vh",fontSize:"14pt"}}>
                            <i className="fa fa-filter" style={{fontSize:"100px"}}></i><br/>
                            <b>
                                Tidak Ada Data
                            </b>
                        </p>
                    </Row>
                </Container>
            </>
    }
}

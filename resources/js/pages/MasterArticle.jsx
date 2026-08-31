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

const path = {
    store: "/master-articles",
    update: "/master-articles/update",
    list:"/master-articles/article/list"
};
const domain = window.location.origin;
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

const initialForm = {
    title: "",
    content: "",
    user: window.AppData?.user?.id || "",
    image: null,
    category: "",
    statusCategory: "",
};

const initialErrors = {
    title: "",
    category: "",
    content: "",
    statusCategory: "",
    image: "",
    message: "",
};

const master = {
    loading:null, articleEmpty:null, toast:null,
    list: null, create:null, article:null
}

master.toast = (errors, successMessage, errorMessage, showToast, setShowToast)=><>
    <ToastContainer position="top-end" className="p-3">
        <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={10000}
            autohide
            bg={errors.message ? "danger" : "success"}
        >
            <Toast.Header>
                <strong className="me-auto">{errors.message ? errorMessage : "Info"}</strong>
            </Toast.Header>

            <Toast.Body className="text-white">
                {errors.message ? errors.message : successMessage}
            </Toast.Body>
        </Toast>
    </ToastContainer>
</>

master.loading = <Col xs={12}>
    <h1 className="text-center" style={{marginTop:"10vh"}}>
        <BlinkBlur color="#ffac00" size="large" text="Loading" textColor="" /> <br />
    </h1>
</Col>

master.articleEmpty = <Row>
    <p className="text-center" style={{marginTop:"10vh",fontSize:"14pt"}}>
        <i className="fa fa-filter" style={{fontSize:"100px"}}></i><br/>
        <b>
            Tidak Ada Data
        </b>
    </p>
</Row>

master.list = (setID, visitArticle) => {
    const [dataArticle, setDataArticle] = useState({data:[], links:[]});
    const [loading, setLoading] = useState(true);
    const [urlGetArticles, seturlGetArticles] = useState(path.list);

    const handlePagination = async (e)=>{
        if (loading)
            api.get(urlGetArticles, {
                withCredentials: true,
            })
            .then((response) => {
                setDataArticle(response.data);
            }).catch((errors)=>{
                console.log(errors);
            }).finally(()=>{
                setLoading(false);
            });
    }; useEffect(() => {handlePagination()});

    const showData = <>
        {dataArticle.data.map((data) => (
            <Col xs="12" md="6" lg="4" xl="3" key={data.id} className="pt-3">
                <Link to={"/master-articles/article/"+""+data.id} onClick={()=>{setID(data.id);visitArticle(true)}} style={{textDecoration:"none",color:"inherit"}}>
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

        <Col xs={12} className="mt-3 mb-3" style={{textAlign:"center"}}>
            {dataArticle.links.map((data)=>{
                return <Button type="button" dangerouslySetInnerHTML={{__html: data.label}} className="btn btn-light border me-1" onClick={(e)=>{setLoading(true); if (data.url != null) seturlGetArticles(data.url);handlePagination(e)}} key={data.label}>
                    </Button>
            })}
        </Col>
    </>

    return <>
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
            {(loading)?master.loading:(dataArticle.data.length == 0)?master.articleEmpty:showData}
        </Row>
    </>
}

master.create = (handleSubmit, category_list) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState(initialErrors);
    const [showToast, setShowToast] = useState(false);

    return <>
        <form onSubmit={(e)=>handleSubmit(e, form, setErrors, setShowToast)}>
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
                                <Form.Control type="text" placeholder="Input title" isInvalid={!!errors.title} value={form.title} onChange={(e) => {setForm({...form, title: e.target.value}); setErrors({...errors, title:""})}}/>
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
                                    data={form.content}
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
        {master.toast(errors, "Insert Success", "Insert Failed", showToast, setShowToast)}
    </>
}

master.update = (handleSubmit, category_list, dataArticle, defaultImg, setDefaultImg) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState(initialErrors);
    const [showToast, setShowToast] = useState(false);
    const article = (dataArticle?.data.length > 0) ? dataArticle.data[0] : {};
    return <>
        <form onSubmit={(e)=>handleSubmit(e, form, setErrors, setShowToast)}>
            <Row>
                <Col>
                    <sup><Link to="/master-articles" style={{textDecoration:"none"}}>Master Articles</Link> &gt;
                    <Link to={"/master-articles/article/"+article.id} style={{textDecoration:"none"}}>{article.title}</Link> &gt; Edit </sup> <br />
                    <b className="h5">
                        Edit Article
                    </b>
                </Col>
                <Col className="d-none d-xl-block">
                    <button type="submit" className="btn btn-primary float-end">Save Article</button>
                </Col>
                <div className="position-fixed end-0 start-0 bottom-0 border py-2 bg-white d-block d-xl-none" style={{zIndex:"1000"}}>
                    <button type="submit" className="btn btn-primary">Save Article</button>
                    <Link to={"/master-articles/article/"+article.id} className="btn btn-danger ms-3">Cancel</Link>
                </div>
            </Row>
            <Row>
                <Col xs={12} md={12} lg={12} xl={4}>
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
                <Col className="pt-3" xs={12} md={12} lg={12} xl={8}>
                    <input type="hidden" value={csrfToken}/>
                    <Row>
                        <Col xs="12" md="8" lg="9">
                            <label>Title</label>
                            <div className="input-group">
                                <Form.Control type="text" placeholder="Input title" isInvalid={!!errors.title} value={article.title} onChange={(e) => {setForm({...form, title: e.target.value}); setErrors({...errors, title:""})}}/>
                            </div>
                            {errors.title && <div className="text-danger">{errors.title[0]}</div>}
                        </Col>
                        <Col xs="12" md="4" lg="3">
                            <label>Category</label>
                            <div className="input-group">
                                <Form.Select value={article.category_id} onChange={(e) => {setForm({...form, category: e.target.value, statusCategory: (e.target.value=="New")?e.target.value:""});setErrors({...errors, category:""})}} isInvalid={!!errors.category} className={(form.statusCategory=="New")?"d-none":"rounded"} style={{textTransform:"capitalize"}}>
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
                        <Col xs="12" className={"mt-1 d-none"}>
                            <label>Banner</label>
                            <div className="input-group">
                                <Form.Control type="file" id="banner" accept="image/*" onChange={(e)=>{setForm({...form, image: (e.target.files.length > 0)?e.target.files[0]:e.target.value});setDefaultImg(URL.createObjectURL(e.target.files[0])); setErrors({...errors, image:""})}} isInvalid={!!errors.image} />
                            </div>
                            {errors.image && <div className="text-danger">{errors.image[0]}</div>}
                        </Col>
                        <Col className={!errors.content ? "mt-3" : "mt-1"} style={{paddingBottom:"66px"}}>
                            {errors.content && <div className="text-danger">{errors.content[0]}</div>}
                            <Col className="p-0" style={(errors.content)?{border:"solid 1px red"}:{}}>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={article.description}
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
        {master.toast(errors, "Update Success", "Update Failed", showToast, setShowToast)}
    </>
}

master.article = (loading, dataArticle)=>{
    const title = (dataArticle.data.length > 0) ? dataArticle.data[0].title : "Article";
    const showData = <>
        {dataArticle.data.map((data) => {
            return <Col xs={12}>
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
                <div style={{paddingBottom:"66px"}}>
                    <h3 className="mt-2">{data.title}</h3>
                    <div dangerouslySetInnerHTML={{__html:data.description}}>
                    </div>
                </div>
            </Col>
        })}
    </>

    return <>
        <p className="text-limit-title-card" style={{fontSize:"8pt"}}>
            <Link to="/master-articles" style={{textDecoration:"none"}}>Master Articles</Link> &gt; {title}  <br />
        </p>
        {(loading) ? master.loading : showData}
    </>
}

export default function MasterArticle() {
    const { page, parameter_id } = useParams();
    const [id, setID] = useState(parameter_id);
    const navigate = useNavigate();

    const option = {
        create:page=="create", update:page=="edit", article:page=="article", list: page==null,
    };

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

    const handleSubmit = async (e, form, setErrors, setShowToast) => {
        e.preventDefault();
        console.log({...form, id:id});

        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", form.title);
        formData.append("content", form.content);
        formData.append("user", form.user);
        if(form.image != null) formData.append("image", form.image);
        formData.append("category", form.category);
        formData.append("statusCategory", form.statusCategory);
        await api.get("/sanctum/csrf-cookie");
        try {
            const str_url = (page=="create")? path.store : path.update;
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
        }catch (error) {
            console.error(error);
            if (error?.response?.status !== 500) {
                setShowToast(true);

                const error_message = error?.response?.data?.errors;
                const errors = {title:error_message?.title, category:error_message?.category, content:error_message?.content, message:error?.response?.data?.message, image:error_message?.image};

                console.error({error_message:error_message});
                console.error({errors:errors});
                setErrors(errors);
            } else {
                console.log(error.response)
                setErrors({message:error.response.data.message});
            }
        }
    }

    /** This Data for page Article and Edit  */
    const [dataArticle, setDataArticle] = useState({data:[]});
    const [defaultImg, setDefaultImg] = useState("");
    const [loading, setLoading] = useState(true);
    const getDataArticle = async ()=>{
        if (loading && id != null)
            api.get(path.list, {
                withCredentials: true, params:{id}
            })
            .then((response) => {
                console.log({dataArticle:response.data})
                setDataArticle(response.data);
                if(response?.data?.data?.length > 0)
                    setDefaultImg(domain+"/"+response.data.data[0].image_url);
            }).catch((errors)=>{
                console.log(errors);
            }).finally(()=>{
                setLoading(false);
            })
    };useEffect(()=>getDataArticle);
    /** This Data for page Article and Edit  */

    return <>
        <NavBar />
        <Container>
            <Row className={(option.list)?"":"d-none"}>{master.list(setID, setLoading)}</Row>
            <Row className={(option.create)?"":"d-none"}>{master.create(handleSubmit, category_list)}</Row>
            <Row className={(option.article)?"":"d-none"}>{master.article(loading, dataArticle, getDataArticle)}</Row>
            <Row className={(option.update)?"":"d-none"}>{master.update(handleSubmit, category_list, dataArticle, defaultImg, setDefaultImg)}</Row>
        </Container>
    </>
}

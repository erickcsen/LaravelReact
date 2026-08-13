import { useState } from "react";
import NavBar from "./Layouts/NavbarMenu"
import { Container, Row, Col } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Form from 'react-bootstrap/Form'

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function MasterArticle() {
    const { page } = useParams();
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const [form, setForm] = useState({
        title:"",
        content:"",
        user:(window.AppData.user)?window.AppData.user.id:'',
        category:""
    });
    const [errors, useErrors] = useState({
        title:"", category:"", content:"", statusCategory:""
    })

    const url = {
        store:"/master-articles/store",
        update:"/master-articles/update"
    };
    const [content, setContent] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        /*
        await api.get("/sanctum/csrf-cookie");
        try {
            const response = (page=="create")? await api.post(url.store, form): await api.post(url.update, form);
            setShowToast(true);
            setErrors({});
            navigate("/");
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            setShowToast(true);
            setErrors(error.response.data);
        }
        /** */
    }
    if (page=="create")
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
                                        <input className="form-control" onChange={(e) => setForm({...form, title: e.target.value})}/>
                                    </div>
                                    {errors.title && <div className="text-danger">{errors.title[0]}</div>}
                                    &nbsp;
                                </Col>
                                <Col xs="12" md="4" lg="3">
                                    <label>Category</label>
                                    <div className="input-group">
                                        <Form.Select onChange={(e) => setForm({...form, category: e.target.value, statusCategory: e.target.value})} className={(form.statusCategory=="New")?"d-none":""}>
                                            <option value="">-- Select Category --</option>
                                            <option value="New">-- New Category --</option>
                                        </Form.Select>
                                        <input onChange={(e) => setForm({...form, category: e.target.value})} className={(form.statusCategory=="New")?"form-control":"form-control d-none"} placeholder="Input new Category"/>
                                        {errors.category && <div className="text-danger">{errors.category[0]}</div>}
                                        &nbsp;
                                    </div>
                                </Col>
                                <Col className="mt-3">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={content}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setForm({...form, content: data})
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </form>
            </Container>
        </>);
    else
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
                        <Col>
                        </Col>
                    </Row>
                </Container>
            </>
        )
}

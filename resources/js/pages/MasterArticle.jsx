import { useState } from "react";
import NavBar from "./Layouts/NavbarMenu"
import { Container, Row, Col } from "react-bootstrap"
import { Link, useParams, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'

import api from "../api";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function MasterArticle() {
    const { page } = useParams();
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title:"",
        content:"",
        user:(window.AppData.user)?window.AppData.user.id:'',
        category:""
    });
    const [errors, setErrors] = useState({
        title:"", category:"", content:"", statusCategory:""
    })

    const url = {
        store:"/master-articles",
        update:"/master-articles/update"
    };
    const [content, setContent] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);

        await api.get("/sanctum/csrf-cookie");
        try {
            const str_url = (page=="create")? url.store : url.update;
            const response = (page=="create")? await api.post(str_url, form): await api.put(str_url, form);
            console.log({str_url, form, response});
            setShowToast(true);
            setErrors({});
            // navigate("/");
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            setShowToast(true);

            const error_message = error.response.data.errors;
            setErrors({title:error_message.title[0], category:error_message.category, content:error_message.content, message:error.response.data.message});
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

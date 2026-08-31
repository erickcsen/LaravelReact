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

const URL = {
    store: "/master-articles",
    update: "/master-articles/update",
    list:"/master-articles/article/list"
};
const domain = window.location.origin;

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

const master = {loading:null, articleEmpty:null, list: null}

master.loading = <Row>
    <h1 className="text-center" style={{marginTop:"10vh"}}>
        <BlinkBlur color="#ffac00" size="large" text="Loading" textColor="" /> <br />
    </h1>
</Row>

master.articleEmpty = <Row>
    <p className="text-center" style={{marginTop:"10vh",fontSize:"14pt"}}>
        <i className="fa fa-filter" style={{fontSize:"100px"}}></i><br/>
        <b>
            Tidak Ada Data
        </b>
    </p>
</Row>

master.list = () => {
    const [dataArticle, setDataArticle] = useState({data:[], links:[]});
    const [loading, setLoading] = useState(true);
    const [urlGetArticles, setUrlGetArticles] = useState(URL.list);

    const handlePagination = async (e)=>{
        if (loading)
            api.get(urlGetArticles, {
                withCredentials: true,
            })
            .then((response) => {
                console.log({dataWithPagination:response});
                setDataArticle(response.data);
            }).catch((errors)=>{
                console.log(errors);
            }).finally(()=>{
                setLoading(false);
            });
    }; useEffect(() => {handlePagination()});

    const showData = <>
        <Row>
            {dataArticle.data.map((data) => (
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
        <Row>
            <Col className="mt-3 mb-3" style={{textAlign:"center"}}>
                {dataArticle.links.map((data)=>{
                    return <Button type="button" dangerouslySetInnerHTML={{__html: data.label}} className="btn btn-light border me-1" onClick={(e)=>{setLoading(true); if (data.url != null) setUrlGetArticles(data.url);handlePagination(e)}} key={data.label}>
                        </Button>
                })}
            </Col>
        </Row>
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

export default function MasterArticle() {
    const { page, parameter_id } = useParams();

    const option = {
        create:page=="create", update:page=="edit", article:page=="article", list: page==null,
    };

    return <>
        <NavBar />
        <Container>
            {(option.list)?master.list():""}
        </Container>
    </>
}

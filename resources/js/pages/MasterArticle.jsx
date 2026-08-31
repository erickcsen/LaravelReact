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

export default function MasterArticle() {
    const { page, parameter_id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [defaultImg, setDefaultImg] = useState("");
    const [dataArticle, setDataArticle] = useState({data:[]});

    const option = {

        articleEmpty:dataArticle.data.length > 0 == true
    }

    return <>
        <NavBar />
        <Container>
            {(option.loading)?<></>:(option.articleEmpty)?<></>:<></>}
        </Container>
    </>
}

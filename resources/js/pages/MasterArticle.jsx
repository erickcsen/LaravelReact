import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BlinkBlur } from "react-loading-indicators";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import NavBar from "./Layouts/NavbarMenu";
import api from "../api";


/* =========================================================
   CONSTANT
========================================================= */

const API_ARTICLE_LIST = "/master-articles/article/list";

const URL = {
    store: "/master-articles",
    update: "/master-articles/update",
};


/* =========================================================
   INITIAL STATE
========================================================= */

const initialForm = {
    title: "",
    content: "",
    user: window.AppData?.user?.id || "",
    image: null,
    category: "",
    statusCategory: ""
};

const initialErrors = {
    title: "",
    category: "",
    content: "",
    statusCategory: "",
    image: "",
    message: "",
};


/* =========================================================
   LOADING COMPONENT
========================================================= */

function Loading() {
    return (
        <>
            <NavBar />

            <Container>
                <Row>
                    <Col>
                        <sup>
                            <Link
                                to="/master-articles"
                                style={{ textDecoration: "none" }}
                            >
                                Master Articles
                            </Link>{" "}
                            &gt; Article
                        </sup>

                        <h1
                            className="text-center"
                            style={{ marginTop: "10vh" }}
                        >
                            <BlinkBlur
                                color="#ffac00"
                                size="large"
                                text="Loading"
                                textColor=""
                            />
                        </h1>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


/* =========================================================
   EMPTY DATA
========================================================= */

function EmptyData() {
    return (
        <>
            <NavBar />

            <Container>
                <Row>
                    <Col>
                        <sup>
                            <Link
                                to="/master-articles"
                                style={{ textDecoration: "none" }}
                            >
                                Master Articles
                            </Link>{" "}
                            &gt; Article
                        </sup>

                        <p
                            className="text-center"
                            style={{
                                marginTop: "10vh",
                                fontSize: "14pt",
                            }}
                        >
                            <i
                                className="fa fa-filter"
                                style={{ fontSize: "100px" }}
                            />

                            <br />

                            <b>Tidak Ada Data</b>

                            <br />

                            <Link to="/master-articles">
                                <Button className="btn btn-light border mt-3">
                                    Back
                                </Button>
                            </Link>
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


/* =========================================================
   TOAST
========================================================= */

function ArticleToast({
    show,
    setShow,
    errors,
    isEdit = false,
}) {
    const hasError = !!errors.message;

    return (
        <ToastContainer
            position="top-end"
            className="p-3"
        >
            <Toast
                onClose={() => setShow(false)}
                show={show}
                delay={10000}
                autohide
                bg={hasError ? "danger" : "success"}
            >
                <Toast.Header>
                    <strong className="me-auto">
                        {hasError
                            ? `${isEdit ? "Update" : "Insert"} Article Failed`
                            : "Info"}
                    </strong>
                </Toast.Header>

                <Toast.Body className="text-white">
                    {hasError
                        ? errors.message
                        : `${isEdit ? "Update" : "Insert"} Article Successful.`}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}


/* =========================================================
   ARTICLE FORM
========================================================= */

function ArticleForm({
    form,
    setForm,
    errors,
    setErrors,
    categoryList,
    content,
    setContent,
    handleSubmit,
    isEdit = false,
    defaultImg = "",
    setDefaultImg,
}) {
    const handleTitleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            title: e.target.value,
        }));

        setErrors((prev) => ({
            ...prev,
            title: "",
        }));
    };


    const handleCategoryChange = (e) => {
        const value = e.target.value;

        setForm((prev) => ({
            ...prev,
            category: value,
            statusCategory: value === "New" ? "New" : "",
        }));

        setErrors((prev) => ({
            ...prev,
            category: "",
        }));
    };


    const handleNewCategoryChange = (e) => {
        setForm((prev) => ({
            ...prev,
            category: e.target.value,
        }));

        setErrors((prev) => ({
            ...prev,
            category: "",
        }));
    };


    const handleImageChange = (e) => {
        const file = e.target.files?.[0] || null;

        setForm((prev) => ({
            ...prev,
            image: file,
        }));

        setErrors((prev) => ({
            ...prev,
            image: "",
        }));

        if (file) {
            const previewUrl = URL.createObjectURL(file);

            setDefaultImg(previewUrl);
        }
    };


    const handleContentChange = (event, editor) => {
        const value = editor.getData();

        setForm((prev) => ({
            ...prev,
            content: value,
        }));

        setContent(value);

        setErrors((prev) => ({
            ...prev,
            content: "",
        }));
    };


    return (
        <form onSubmit={handleSubmit}>

            {/* HEADER */}
            <Row>
                <Col>
                    <sup>
                        <Link
                            to="/master-articles"
                            style={{ textDecoration: "none" }}
                        >
                            Master Articles
                        </Link>

                        {" > "}

                        {isEdit ? (
                            <>
                                <Link
                                    to={`/master-articles/article/${form.id}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    {form.title}
                                </Link>

                                {" > "}
                                Edit Article
                            </>
                        ) : (
                            "New Article"
                        )}
                    </sup>

                    <br />

                    <b className="h5">
                        {isEdit ? "Edit Article" : "New Article"}
                    </b>
                </Col>


                {/* DESKTOP BUTTON */}
                <Col className="d-none d-md-block">
                    <button
                        type="submit"
                        className="btn btn-primary float-end"
                    >
                        Save Article
                    </button>
                </Col>


                {/* MOBILE BUTTON */}
                <div
                    className="position-fixed end-0 start-0 bottom-0 border py-2 bg-white d-block d-md-none"
                    style={{ zIndex: 1000 }}
                >
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Save Article
                    </button>

                    <Link
                        to="/master-articles"
                        className="btn btn-danger ms-3"
                    >
                        Cancel
                    </Link>
                </div>
            </Row>


            <Row className="mt-3">

                {/* IMAGE - EDIT ONLY */}
                {isEdit && (
                    <Col
                        xs={12}
                        md={12}
                        lg={5}
                        xl={4}
                        className="mb-3"
                    >
                        <div
                            style={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <div style={{ textAlign: "center" }}>
                                {defaultImg && (
                                    <img
                                        src={defaultImg}
                                        width="100%"
                                        className="rounded"
                                        alt="Article Banner"
                                    />
                                )}

                                <br />

                                <label
                                    className="btn btn-light mt-3"
                                    htmlFor="banner"
                                >
                                    Change Image
                                </label>
                            </div>
                        </div>
                    </Col>
                )}


                <Col
                    xs={12}
                    md={12}
                    lg={isEdit ? 7 : 12}
                    xl={isEdit ? 8 : 12}
                >
                    <Row>

                        {/* TITLE */}
                        <Col
                            xs={12}
                            md={8}
                            lg={9}
                        >
                            <Form.Label>
                                Title
                            </Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Input title"
                                value={form.title}
                                isInvalid={!!errors.title}
                                onChange={handleTitleChange}
                            />

                            {errors.title && (
                                <div className="text-danger">
                                    {errors.title[0]}
                                </div>
                            )}
                        </Col>


                        {/* CATEGORY */}
                        <Col
                            xs={12}
                            md={4}
                            lg={3}
                        >
                            <Form.Label>
                                Category
                            </Form.Label>

                            <Form.Select
                                value={
                                    form.statusCategory === "New"
                                        ? "New"
                                        : form.category
                                }
                                onChange={handleCategoryChange}
                                isInvalid={!!errors.category}
                                className={
                                    form.statusCategory === "New"
                                        ? "d-none"
                                        : "rounded"
                                }
                            >
                                <option value="">
                                    -- Select Category --
                                </option>

                                <option value="New">
                                    -- New Category --
                                </option>

                                {categoryList.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.title}
                                    </option>
                                ))}
                            </Form.Select>


                            {/* NEW CATEGORY */}
                            <Form.Control
                                type="text"
                                value={
                                    form.statusCategory === "New"
                                        ? form.category
                                        : ""
                                }
                                onChange={handleNewCategoryChange}
                                className={
                                    form.statusCategory === "New"
                                        ? "rounded"
                                        : "d-none"
                                }
                                placeholder="Input new Category"
                            />

                            {errors.category && (
                                <div className="text-danger">
                                    {errors.category[0]}
                                </div>
                            )}
                        </Col>


                        {/* IMAGE */}
                        <Col
                            xs={12}
                            className="mt-3"
                        >
                            <Form.Label>
                                Banner
                            </Form.Label>

                            <Form.Control
                                id="banner"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                isInvalid={!!errors.image}
                            />

                            {errors.image && (
                                <div className="text-danger">
                                    {errors.image[0]}
                                </div>
                            )}
                        </Col>


                        {/* CKEDITOR */}
                        <Col
                            xs={12}
                            className="mt-3"
                            style={{ paddingBottom: "66px" }}
                        >
                            {errors.content && (
                                <div className="text-danger mb-1">
                                    {errors.content[0]}
                                </div>
                            )}

                            <div
                                style={
                                    errors.content
                                        ? {
                                              border: "1px solid red",
                                          }
                                        : {}
                                }
                            >
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={content}
                                    onChange={handleContentChange}
                                />
                            </div>
                        </Col>

                    </Row>
                </Col>

            </Row>
        </form>
    );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function MasterArticle() {

    const { page, parameter_id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        ...initialForm,
    });

    const [errors, setErrors] = useState({
        ...initialErrors,
    });

    const [categoryList, setCategoryList] = useState(
        window.AppData?.category || []
    );

    const [content, setContent] = useState("");

    const [defaultImg, setDefaultImg] = useState("");

    const [showToast, setShowToast] = useState(false);

    const [loading, setLoading] = useState(
        page === "edit" || page === "article"
    );

    const [loadingPagination, setLoadingPagination] = useState(
        !page
    );

    const [article, setArticle] = useState({
        data: [],
    });

    const [articleList, setArticleList] = useState({
        data: [],
        links: [],
    });

    const [articleListUrl, setArticleListUrl] = useState(
        API_ARTICLE_LIST
    );

    const domain = window.location.origin;


    /* =====================================================
       TITLE
    ===================================================== */

    useEffect(() => {

        const titles = {
            create: "Master Article - New Article",
            edit: "Master Article - Edit Article",
            article: "Master Article - Read Article",
        };

        document.title = titles[page] || "Master Article";

    }, [page]);


    /* =====================================================
       GET CATEGORY
    ===================================================== */

    useEffect(() => {

        if (categoryList.length > 0) {
            return;
        }

        api.get("/category/list", {
            withCredentials: true,
        })
            .then((response) => {

                setCategoryList(response.data);

                window.AppData.category = response.data;

            })
            .catch((error) => {
                console.error(
                    "Failed to load category:",
                    error
                );
            });

    }, []);


    /* =====================================================
       GET ARTICLE DETAIL
    ===================================================== */

    useEffect(() => {

        if (
            (page === "edit" || page === "article") &&
            parameter_id
        ) {
            getArticle(parameter_id);
        }

    }, [page, parameter_id]);


    /* =====================================================
       GET ARTICLE LIST
    ===================================================== */

    useEffect(() => {

        if (!page) {
            getArticleList(API_ARTICLE_LIST);
        }

    }, [page]);


    /* =====================================================
       GET ARTICLE
    ===================================================== */

    const getArticle = async (id) => {

        setLoading(true);

        try {

            const response = await api.get(
                API_ARTICLE_LIST,
                {
                    withCredentials: true,
                    params: {
                        id,
                    },
                }
            );

            const result = response.data;

            setArticle(result);

            if (result?.data?.length > 0) {

                const data = result.data[0];

                setForm((prev) => ({
                    ...prev,
                    id: data.id,
                    title: data.title,
                    content: data.description,
                    category: data.category_id,
                    defaultImg:
                        domain +
                        "/" +
                        data.image_url,
                }));

                setContent(data.description || "");

                setDefaultImg(
                    domain +
                    "/" +
                    data.image_url
                );
            }

        } catch (error) {

            console.error(
                "Failed to get article:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    /* =====================================================
       GET ARTICLE LIST
    ===================================================== */

    const getArticleList = async (url) => {

        setLoadingPagination(true);

        try {

            const response = await api.get(url, {
                withCredentials: true,
            });

            setArticleList(response.data);

        } catch (error) {

            console.error(
                "Failed to get articles:",
                error
            );

        } finally {

            setLoadingPagination(false);

        }
    };


    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit = async (e) => {

        e.preventDefault();

        setErrors({
            ...initialErrors,
        });

        const formData = new FormData();

        if (page === "edit") {
            formData.append(
                "id",
                parameter_id
            );
        }

        formData.append(
            "title",
            form.title
        );

        formData.append(
            "content",
            form.content
        );

        formData.append(
            "user",
            form.user
        );

        formData.append(
            "category",
            form.category
        );

        formData.append(
            "statusCategory",
            form.statusCategory
        );

        if (form.image) {
            formData.append(
                "image",
                form.image
            );
        }


        try {

            await api.get(
                "/sanctum/csrf-cookie"
            );

            let response;

            if (page === "create") {

                response = await api.post(
                    URL.store,
                    formData
                );

            } else {

                response = await api.post(
                    URL.update,
                    formData
                );

            }

            console.log(
                "Success:",
                response.data
            );

            navigate(
                "/master-articles"
            );

        } catch (error) {

            console.error(
                "Submit error:",
                error
            );

            const response = error.response;

            if (!response) {
                return;
            }

            const backendErrors =
                response.data?.errors || {};

            setErrors({
                title:
                    backendErrors.title || "",
                category:
                    backendErrors.category || "",
                content:
                    backendErrors.content || "",
                statusCategory:
                    backendErrors.statusCategory || "",
                image:
                    backendErrors.image || "",
                message:
                    response.data?.message ||
                    "Terjadi kesalahan.",
            });

            setShowToast(true);
        }
    };


    /* =====================================================
       CREATE
    ===================================================== */

    if (page === "create") {

        return (
            <>
                <NavBar />

                <Container className="mt-3">

                    <ArticleForm
                        form={form}
                        setForm={setForm}
                        errors={errors}
                        setErrors={setErrors}
                        categoryList={categoryList}
                        content={content}
                        setContent={setContent}
                        handleSubmit={handleSubmit}
                        isEdit={false}
                        defaultImg={defaultImg}
                        setDefaultImg={setDefaultImg}
                    />

                </Container>

                <ArticleToast
                    show={showToast}
                    setShow={setShowToast}
                    errors={errors}
                    isEdit={false}
                />
            </>
        );
    }


    /* =====================================================
       EDIT
    ===================================================== */

    if (page === "edit") {

        if (loading) {
            return <Loading />;
        }

        if (!article?.data?.length) {
            return <EmptyData />;
        }

        return (
            <>
                <NavBar />

                <Container className="mt-3">

                    <ArticleForm
                        form={form}
                        setForm={setForm}
                        errors={errors}
                        setErrors={setErrors}
                        categoryList={categoryList}
                        content={content}
                        setContent={setContent}
                        handleSubmit={handleSubmit}
                        isEdit={true}
                        defaultImg={defaultImg}
                        setDefaultImg={setDefaultImg}
                    />

                </Container>

                <ArticleToast
                    show={showToast}
                    setShow={setShowToast}
                    errors={errors}
                    isEdit={true}
                />
            </>
        );
    }


    /* =====================================================
       ARTICLE DETAIL
    ===================================================== */

    if (page === "article") {

        if (!parameter_id) {
            navigate("/master-articles");
            return null;
        }

        if (loading) {
            return <Loading />;
        }

        if (!article?.data?.length) {
            return <EmptyData />;
        }

        return (
            <>
                <NavBar />

                <Container className="mt-3">

                    {article.data.map((item) => (

                        <Row key={item.id}>

                            <Col xs={12}>

                                <sup>
                                    <Link
                                        to="/master-articles"
                                        style={{
                                            textDecoration:
                                                "none",
                                        }}
                                    >
                                        Master Articles
                                    </Link>

                                    {" > "}

                                    {item.title}
                                </sup>


                                {/* DESKTOP ACTION */}
                                <div
                                    className="d-none d-md-block mt-3"
                                    style={{
                                        textAlign: "right",
                                    }}
                                >

                                    <Link
                                        to={`/master-articles/edit/${item.id}`}
                                    >
                                        <Button className="btn btn-light border">
                                            <i className="fa fa-edit" />{" "}
                                            Edit
                                        </Button>
                                    </Link>

                                    {" "}

                                    <Button className="btn btn-danger">
                                        <i className="fa fa-trash" />{" "}
                                        Delete
                                    </Button>

                                </div>


                                {/* IMAGE */}
                                <div
                                    className="mt-3"
                                    style={{
                                        backgroundImage:
                                            `url(${domain}/${item.image_url})`,
                                        height: "300px",
                                        backgroundSize:
                                            "auto 100%",
                                        backgroundPosition:
                                            "center",
                                        backgroundRepeat:
                                            "no-repeat",
                                    }}
                                />

                            </Col>


                            {/* CONTENT */}
                            <Col
                                xs={12}
                                style={{
                                    paddingBottom:
                                        "66px",
                                }}
                            >

                                <h3 className="mt-3">
                                    {item.title}
                                </h3>

                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            item.description,
                                    }}
                                />

                            </Col>

                        </Row>

                    ))}

                </Container>


                {/* MOBILE ACTION */}
                <div
                    className="position-fixed end-0 start-0 bottom-0 border py-2 bg-white d-block d-md-none px-3"
                    style={{ zIndex: 1000 }}
                >

                    <Link
                        to="/master-articles"
                        className="btn btn-light border"
                    >
                        <i className="fa fa-angle-left" />{" "}
                        Back
                    </Link>

                    <div className="float-end">

                        <Link
                            to={`/master-articles/edit/${parameter_id}`}
                        >
                            <Button className="btn btn-light border">
                                <i className="fa fa-edit" />
                            </Button>
                        </Link>

                        {" "}

                        <Button className="btn btn-danger">
                            <i className="fa fa-trash" />
                        </Button>

                    </div>

                </div>
            </>
        );
    }


    /* =====================================================
       MASTER ARTICLE LIST
    ===================================================== */

    return (
        <>
            <NavBar />

            <Container className="mt-3">

                <Row>

                    <Col>
                        <b className="h5">
                            Master Article
                        </b>
                    </Col>

                </Row>


                <Row>

                    <Col>

                        <Link
                            to="/master-articles/create"
                            className="btn btn-primary mt-3"
                        >
                            New Article
                        </Link>

                    </Col>

                </Row>


                {/* LOADING */}
                {loadingPagination && (
                    <Row>

                        <Col
                            className="text-center"
                            style={{
                                marginTop: "10vh",
                            }}
                        >

                            <BlinkBlur
                                color="#ffac00"
                                size="large"
                                text="Loading"
                                textColor=""
                            />

                        </Col>

                    </Row>
                )}


                {/* DATA */}
                {!loadingPagination &&
                    articleList?.data?.length > 0 && (

                        <Row className="mt-3">

                            {articleList.data.map(
                                (item) => (

                                    <Col
                                        xs={12}
                                        md={6}
                                        lg={3}
                                        key={item.id}
                                        className="pt-3"
                                    >

                                        <Link
                                            to={`/master-articles/article/${item.id}`}
                                            style={{
                                                textDecoration:
                                                    "none",
                                                color: "inherit",
                                            }}
                                        >

                                            <div className="border">

                                                <div
                                                    style={{
                                                        backgroundImage:
                                                            `url(${domain}/${item.image_url})`,
                                                        height:
                                                            "200px",
                                                        backgroundSize:
                                                            "100% 100%",
                                                    }}
                                                />

                                                <div className="p-2">

                                                    <b
                                                        style={{
                                                            fontSize:
                                                                "large",
                                                        }}
                                                        className="text-limit-title-card"
                                                    >
                                                        {item.title}
                                                    </b>

                                                    <div
                                                        className="mt-2 text-limit"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                item.description,
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                        </Link>

                                    </Col>

                                )
                            )}

                        </Row>

                    )}


                {/* EMPTY */}
                {!loadingPagination &&
                    !articleList?.data?.length && (

                        <p
                            className="text-center"
                            style={{
                                marginTop: "10vh",
                                fontSize: "14pt",
                            }}
                        >

                            <i
                                className="fa fa-filter"
                                style={{
                                    fontSize: "100px",
                                }}
                            />

                            <br />

                            <b>
                                Tidak Ada Data
                            </b>

                        </p>

                    )}


                {/* PAGINATION */}
                {!loadingPagination &&
                    articleList?.links?.length > 0 && (

                        <Row>

                            <Col
                                className="mt-3 mb-3 text-center"
                            >

                                {articleList.links.map(
                                    (item, index) => (

                                        <Button
                                            key={`${item.label}-${index}`}
                                            type="button"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    item.label,
                                            }}
                                            className="btn btn-light border me-1"
                                            disabled={
                                                !item.url
                                            }
                                            onClick={() => {

                                                if (
                                                    item.url
                                                ) {

                                                    setArticleListUrl(
                                                        item.url
                                                    );

                                                    getArticleList(
                                                        item.url
                                                    );

                                                }

                                            }}
                                        />

                                    )
                                )}

                            </Col>

                        </Row>

                    )}

            </Container>
        </>
    );
}

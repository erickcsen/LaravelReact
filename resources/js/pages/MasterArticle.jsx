import NavBar from "./Layouts/NavbarMenu"

const API_ARTICLE_LIST = "/master-articles/article/list";
const URL = {
    store: "/master-articles",
    update: "/master-articles/update",
};

const Master = {article:null, create:null, update:null, list:null, loading:{index:null, article:null}}

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

Master.loading.index = () => <>
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

Master.loading.article = () => <>
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

Master.list = ()=>{
    return ;
}

Master.article = ()=>{
    return ;
}

Master.create = ()=>{
    return ;
}

Master.update = ()=>{
    return ;
}

export default function MasterArticle() {
    const { page, parameter_id } = useParams();
    const navigate = useNavigate();

    return (page == "create")? Master.create
        : (page == "edit") ? Master.update
        : (page == "article") ? Master.article
        : Master.list;
}

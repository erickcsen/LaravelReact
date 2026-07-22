import Carousel from 'react-bootstrap/Carousel';

import Navbar from './Layouts/Navbar';

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <div className='container' style={{ paddingTop: "50px" }}>
                <div className='col-xs-12'>

                    <Carousel>
                        <Carousel.Item>
                            <div className='d-block w-100' style={{backgroundSize:"auto 100%",backgroundPosition:"center",backgroundImage:"url(https://png.pngtree.com/thumb_back/fh260/background/20241007/pngtree-messi-dribbling-past-defenders-with-ronaldo-sprinting-in-support-dynamic-soccer-image_16307791.jpg)",height:"400px"}}></div>

                            <Carousel.Caption>
                                <h3 style={{textShadow:"0px 0px 10px black"}}>Slide Pertama</h3>
                                <p style={{textShadow:"0px 0px 10px black",fontWeight:"bold"}}>Deskripsi slide pertama.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <div className='d-block w-100' style={{backgroundSize:"auto 100%",backgroundPosition:"center",backgroundImage:"url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8jLMjAwiaFfRi84hSMwIVT5f2F86Mof2AX7Wj8-8pRGbNGrvByQ-V6KnR&s=10",height:"400px"}}></div>

                            <Carousel.Caption>
                                <h3 style={{textShadow:"0px 0px 10px black"}}>Slide Kedua</h3>
                                <p style={{textShadow:"0px 0px 10px black",fontWeight:"bold"}}>Deskripsi slide kedua.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <div className='d-block w-100' style={{backgroundSize:"auto 100%",backgroundPosition:"center",backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaMA-rjC0vCjXBQ-cXYoFjCDsOWZrLMuW2zZgWvSlDqJafe7a5ApNlx0o&s=10')",height:"400px"}}></div>

                            <Carousel.Caption>
                                <h3 style={{textShadow:"0px 0px 10px black"}}>Slide Ketiga</h3>
                                <p style={{textShadow:"0px 0px 10px black",fontWeight:"bold"}}>Deskripsi slide ketiga.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </>
    );
}

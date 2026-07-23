import Carousel from 'react-bootstrap/Carousel';

import Navbar from './Layouts/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <div className='container' style={{ paddingTop: "50px" }}>
                <div className='col-xs-12 carouselSlider'>
                    <Carousel>
                        <Carousel.Item>
                            <div className='d-none d-md-block w-100 blurBackground' style={{backgroundSize:"100% auto",backgroundPosition:"center",backgroundImage:"url(https://png.pngtree.com/thumb_back/fh260/background/20241007/pngtree-messi-dribbling-past-defenders-with-ronaldo-sprinting-in-support-dynamic-soccer-image_16307791.jpg)",backgroundRepeat:"no-repeat",height:"400px"}}>
                            </div>
                            <div className='d-none d-md-block w-100 noneBlurBg' style={{backgroundSize:"auto 100%",backgroundPosition:"center",backgroundImage:"url(https://png.pngtree.com/thumb_back/fh260/background/20241007/pngtree-messi-dribbling-past-defenders-with-ronaldo-sprinting-in-support-dynamic-soccer-image_16307791.jpg)",backgroundRepeat:"no-repeat",height:"400px"}}>
                            </div>
                            <div className='d-block d-md-none w-100' style={{backgroundSize:"auto 100%",backgroundPosition:"center",backgroundImage:"url(https://png.pngtree.com/thumb_back/fh260/background/20241007/pngtree-messi-dribbling-past-defenders-with-ronaldo-sprinting-in-support-dynamic-soccer-image_16307791.jpg)",backgroundRepeat:"no-repeat",height:"250px"}}>
                            </div>

                            <Carousel.Caption>
                                <h3 style={{textShadow:"0px 0px 10px black"}}>Slide Pertama</h3>
                                <p style={{textShadow:"0px 0px 10px black",fontWeight:"bold"}}>Deskripsi slide pertama.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <div className='d-none d-md-block w-100 blurBackground' style={{backgroundSize:"100% auto",backgroundPosition:"center",backgroundImage:"url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8jLMjAwiaFfRi84hSMwIVT5f2F86Mof2AX7Wj8-8pRGbNGrvByQ-V6KnR&s=10",backgroundRepeat:"no-repeat",height:"400px"}}>
                            </div>
                            <div className='d-none d-md-block w-100 noneBlurBg' style={{backgroundSize:"auto 100%",backgroundPosition:"center",backgroundImage:"url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8jLMjAwiaFfRi84hSMwIVT5f2F86Mof2AX7Wj8-8pRGbNGrvByQ-V6KnR&s=10",backgroundRepeat:"no-repeat",height:"400px"}}>
                            </div>
                            <div className='d-block d-md-none w-100' style={{backgroundSize:"auto 100%",backgroundPosition:"center",backgroundImage:"url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8jLMjAwiaFfRi84hSMwIVT5f2F86Mof2AX7Wj8-8pRGbNGrvByQ-V6KnR&s=10",backgroundRepeat:"no-repeat",height:"250px"}}>
                            </div>

                            <Carousel.Caption>
                                <h3 style={{textShadow:"0px 0px 10px black"}}>Slide Kedua</h3>
                                <p style={{textShadow:"0px 0px 10px black",fontWeight:"bold"}}>Deskripsi slide kedua.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <div className='d-none d-md-block w-100 blurBackground' style={{backgroundSize:"100% auto",backgroundPosition:"center",backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaMA-rjC0vCjXBQ-cXYoFjCDsOWZrLMuW2zZgWvSlDqJafe7a5ApNlx0o&s=10')",backgroundRepeat:"no-repeat",height:"400px"}}>
                            </div>
                            <div className='d-none d-md-block w-100 noneBlurBg' style={{backgroundSize:"auto 100%",backgroundPosition:"center",backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaMA-rjC0vCjXBQ-cXYoFjCDsOWZrLMuW2zZgWvSlDqJafe7a5ApNlx0o&s=10')",backgroundRepeat:"no-repeat",height:"400px"}}>
                            </div>
                            <div className='d-block d-md-none w-100' style={{backgroundSize:"auto 100%",backgroundPosition:"center",backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaMA-rjC0vCjXBQ-cXYoFjCDsOWZrLMuW2zZgWvSlDqJafe7a5ApNlx0o&s=10')",backgroundRepeat:"no-repeat",height:"250px"}}>
                            </div>

                            <Carousel.Caption>
                                <h3 style={{textShadow:"0px 0px 10px black"}}>Slide Ketiga</h3>
                                <p style={{textShadow:"0px 0px 10px black",fontWeight:"bold"}}>Deskripsi slide ketiga.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className='col-xs-12 mt-3'>
                    <CardGroup>
                        <div className='px-1 py-1'>
                            <Card style={{ width: '18rem', margin:"0 auto" }}>
                                <Card.Img variant="top" src="https://png.pngtree.com/thumb_back/fh260/background/20241007/pngtree-messi-dribbling-past-defenders-with-ronaldo-sprinting-in-support-dynamic-soccer-image_16307791.jpg" height="190px" />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className='px-1 py-1'>
                            <Card style={{ width: '18rem', margin:"0 auto" }}>
                                <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8jLMjAwiaFfRi84hSMwIVT5f2F86Mof2AX7Wj8-8pRGbNGrvByQ-V6KnR&s=10" height="190px"/>
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className='px-1 py-1'>
                            <Card style={{ width: '18rem', margin:"0 auto" }}>
                                <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaMA-rjC0vCjXBQ-cXYoFjCDsOWZrLMuW2zZgWvSlDqJafe7a5ApNlx0o&s=10" height="190px"/>
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </CardGroup>
                </div>
            </div>
        </>
    );
}

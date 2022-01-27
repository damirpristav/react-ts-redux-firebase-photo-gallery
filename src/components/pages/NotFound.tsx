import { Button, } from '@mui/material' 
import React, { FC } from 'react'
import { useHistory } from 'react-router';
import '../../styles/NotFound.css'

const NotFound: FC = () => {
    const history = useHistory();

    return (
        <div>
            <section className="page_404">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 ">
                            <div className="col-sm-10 col-sm-offset-1  text-center">
                                <div className="four_zero_four_bg">
                                    <h1 className="text-center ">404</h1>
                                </div>

                                <div className="contant_box_404">
                                    <h3 className="h2">
                                        Look like you're lost
                                    </h3>
                                    <p>the page you are looking for not avaible!</p>

                                    <Button color="primary" variant="contained" onClick={() => history.push('/')}>
                                        Back To Home
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default NotFound
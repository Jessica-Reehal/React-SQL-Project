import { React } from 'react';
import {Col,Row} from 'react-bootstrap';

const Navbar = () => {
    return (
            <div>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" id="brandName" href="#">BookGeekNation</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                  
                </div>
            </nav>
            <div className='style'></div>
            </div>


    )



}

export default Navbar;
import React from 'react'

import Header from '../Layouts/Header'

function Home() {

  return (
    <div>
      <Header />
      <div id="hatter" className="carousel slide" data-bs-touch="false" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item" data-bs-interval="5000">
            <img src='images/assets/home.jpg' alt="" className='home-wallpaper'/>
          </div>
          <div className="carousel-item active" data-bs-interval="5000">
            <img src='images/assets/home2.jpg' alt="" className='home-wallpaper'/>
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img src='images/assets/home3.jpg' alt="" className='home-wallpaper'/>
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img src='images/assets/home4.jpg' alt="" className='home-wallpaper'/>
          </div>
        </div>
        <div className='home-wallpaper-screen'><img src='images/assets/overlay.png' alt="" /></div>
        <div className='home-wallpaper-screen'>
          <div className='card position-absolute top-50 start-50 translate-middle w-35 p-3 shadow-lg container'>
            <div className="card-body">
              <div className='h2'>Házhozszállítás egész Békéscsabán!</div>
              <div className="h4">Rendelj még ma!</div>
            </div>
            <div className='card-footer'>
              <div className='container'>
                <div className='row' style={{marginBottom: "10px"}}>
                  <a href="/shop" className='btn btn-dark bg-gradient col-10 mx-auto'>Rendelés!</a>
                </div>
                <div className='row'>
                  <a href="/asztalfoglalas" className='btn btn-dark bg-gradient col-10 mx-auto'>Asztalfoglalás!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Home
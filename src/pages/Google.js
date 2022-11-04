import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import Cookies from 'universal-cookie';
import '../css/basicDesing.css'

const cookies = new Cookies()

function Google() {


    const [ profile, setProfile ] = useState([]);
    const clientId = '935001602405-hv6fkgse0c7sj9rkemni13fe30ifuco0.apps.googleusercontent.com';
  
  
   useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
 
  
    });

    const onSuccess = (res) => {
        setProfile(res.profileObj);
        console.log(res)
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile(null);
    };

  
    const continuar = () =>{
        cookies.set('user', profile.givenName, {path:"/"});
        cookies.set('email', profile.email, {path:"/"});
        alert(`Bienvenido ${profile.name}`);

        window.location.href="./lista"
        
      console.log('ok')
        
    }
  
  
    return (
       
            
            
          




        <>

               
            
        <body className='body'>
        
        <div className="wrapper fadeInDown">
            <div id="formContent">



                <div className="fadeIn first">
                    <img src="https://admacad.udb.edu.sv/Recursos/imagenes/UDB_negras.png" id="icon" alt="User Icon" />
                </div>


                    <div >

                        
                    {profile ? (
                <div fadeIn second>
                    <br></br>
                    <img className="fadeIn first" src={profile.imageUrl} alt="user image" />
                    <p className='p-2'></p>
                    <p className="fadeIn first">Nombre: {profile.name}</p>
                    <br></br>
                    <p className="fadeIn first">Correo: {profile.email}</p>
                    <br />
                    <br />
                    <GoogleLogout clientId={clientId} buttonText="Cambiar cuenta" onLogoutSuccess={logOut} />
                   <br></br>
                   <button className="btn btn-primary p-2 m-2" onClick={continuar}>Continuar</button>              


                </div>
            ) : (
                <GoogleLogin
                                        clientId={clientId}
                                        buttonText="Sign in with Google"
                                        onSuccess={onSuccess}
                                        onFailure={onFailure}
                                        cookiePolicy={'single_host_origin'} />

            )}     
                                        
                                        

                                       

                                              
                         </div>                                               
            
             
               
                <div id="formFooter">
                    <a className="underlineHover" href='./registro'>Registrarse</a>
                    <br/>
                    <a className="underlineHover" href='./'>Iniciar seson con usuario</a>
                </div>

            </div>
        </div>
        </body>
      </>













      
           
        
    );
}
export default Google;
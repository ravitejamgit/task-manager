import React from "react";


function Login() {
    return(
        <div>
            <div className="login-header">
                Login Page
            </div>
            <div className="login-body">
                <label>User Name : </label>
                <input 
                    name="login-username"
                    type="text"
                    value=""
                    placeholder="username"/>
                <label>Password : </label>
                <input
                    name="login-password"
                    type="password"
                    placeholder="password"/>
                <button>Login</button>
            </div>
        </div>
    );
}


export default Login;
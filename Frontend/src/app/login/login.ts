import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  constructor(private router: Router) {}

  email = '';
  password = ''; 

  onLogin() {
    fetch("http://127.0.0.1:8000/api/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Login failed");
        }

        // 🔐 Save tokens (SimpleJWT)
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);


        

        this.router.navigate(['/home']);
        console.log("Login success:", data);

        // 👉 redirect after login (optional)
        // this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error("Login error:", error.message);
      });
}

  
}
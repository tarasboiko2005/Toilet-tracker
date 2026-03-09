import React, { Component } from 'react'
import styles from './sign_in.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Sign_in extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      visible: false,
      response_error: ""
    }
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
    this.setState({ response_error: "" });
  }

  togglePasswordVisibility = () => {
    this.setState(prevState => ({ visible: !prevState.visible }))
  }

  setPasswordText = (value) => {
    this.setState({ password: value })
  }
  submitHandler = e => {
    e.preventDefault()
    const payload = {
      email: this.state.username,
      password: this.state.password
    }
    axios.post('/api/v1/users/auth', payload)
      .then(response => {
        const token = response.data.jwt
        console.log(token)
        localStorage.setItem('jsonwebtoken', token)
        window.location.href = "/";
      })
      .catch(error => {
        this.setState({ response_error: error.response?.data?.detail || "Sign in failed" });
        console.log(error);
      })
  }

  handleChange = (e) => {
    this.setPasswordText(e.target.value); // Викликаємо перший обробник
    this.changeHandler(e); // Викликаємо другий обробник
    this.setState({ response_error: "" });
  }

  render() {
    const { username, password, visible } = this.state
    return (
      <div className={styles.conteiner}>
        <div className={styles.exitToMain}>
          <Link to="/">
            <svg width="15" height="27" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.30121 7.29944C3.90875 7.68795 3.90551 8.32105 4.29399 8.71356L9.06537 13.5344C9.45397 13.9271 9.45059 14.5604 9.05782 14.9489L8.69533 15.3074C8.30276 15.6957 7.6698 15.6923 7.28139 15.2999L0.744659 8.69532C0.356154 8.30278 0.359422 7.66963 0.751956 7.28112L7.35624 0.744642C7.74878 0.356138 8.38193 0.359405 8.77044 0.751939L9.12853 1.11375C9.51701 1.50625 9.51377 2.13935 9.1213 2.52787L4.30121 7.29944Z" fill="black" />
            </svg>
          </Link>
        </div>
        <div className={styles.main_box}>
          <div className={styles.main_sign_text}>Sign In</div>
          {this.state.response_error && this.state.response_error !== "" &&
            <div className={styles.main_mistake}>
              <svg className={styles.main_cross_icon} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                <path fill="currentColor" fillRule="evenodd" d="M.877 7.5a6.623 6.623 0 1 1 13.246 0a6.623 6.623 0 0 1-13.246 0M7.5 1.827a5.673 5.673 0 1 0 0 11.346a5.673 5.673 0 0 0 0-11.346m2.354 3.32a.5.5 0 0 1 0 .707L8.207 7.5l1.647 1.646a.5.5 0 0 1-.708.708L7.5 8.207L5.854 9.854a.5.5 0 0 1-.708-.708L6.793 7.5L5.146 5.854a.5.5 0 0 1 .708-.708L7.5 6.793l1.646-1.647a.5.5 0 0 1 .708 0" clipRule="evenodd" />
              </svg>
              <p>{this.state.response_error}</p>
            </div>
          }

          <div className={styles.main_box_email}>
            <input className={styles.main_input_email} type="text" name="username" value={username} onChange={this.changeHandler} required />
            <div className={styles.main_input_email_placeholder}>Enter your email</div>
          </div>
          <div className={styles.main_box_password}>
            <svg className={styles.main_password_icon} onClick={() => this.togglePasswordVisibility(!visible)} width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.10235 6.85938V6.8635C2.0792 6.95083 2.03905 7.03274 1.98422 7.10455C1.92938 7.17636 1.86093 7.23665 1.78278 7.28198C1.70463 7.32732 1.6183 7.3568 1.52875 7.36875C1.43919 7.3807 1.34816 7.37488 1.26085 7.35162C0.668228 7.19487 0.772728 6.5115 0.772728 6.5115L0.797479 6.42625C0.797479 6.42625 0.833228 6.31075 0.862103 6.22687C1.21496 5.23754 1.7344 4.31584 2.39798 3.50163C3.63135 1.99738 5.70623 0.5 8.99935 0.5C12.2925 0.5 14.3674 1.99738 15.6021 3.50163C16.2657 4.31584 16.7851 5.23754 17.138 6.22687C17.1675 6.31191 17.195 6.39764 17.2205 6.484L17.2246 6.50187V6.50738L17.226 6.51013C17.2696 6.68512 17.2427 6.87024 17.1511 7.02559C17.0595 7.18093 16.9105 7.29407 16.7363 7.3406C16.562 7.38714 16.3765 7.36335 16.2196 7.27436C16.0628 7.18537 15.9472 7.03831 15.8977 6.86487L15.8964 6.85938L15.8854 6.825C15.8074 6.58162 15.7156 6.34289 15.6104 6.11C15.3301 5.48682 14.9696 4.90299 14.5379 4.37337C13.5176 3.129 11.8099 1.875 8.99935 1.875C6.18885 1.875 4.48248 3.129 3.46085 4.37337C2.90054 5.06153 2.46117 5.83985 2.16148 6.67513C2.14449 6.72477 2.12845 6.77474 2.11335 6.825L2.10235 6.85938ZM5.56185 8.0625C5.56185 7.15082 5.92402 6.27648 6.56867 5.63182C7.21333 4.98716 8.08767 4.625 8.99935 4.625C9.91104 4.625 10.7854 4.98716 11.43 5.63182C12.0747 6.27648 12.4369 7.15082 12.4369 8.0625C12.4369 8.97418 12.0747 9.84852 11.43 10.4932C10.7854 11.1378 9.91104 11.5 8.99935 11.5C8.08767 11.5 7.21333 11.1378 6.56867 10.4932C5.92402 9.84852 5.56185 8.97418 5.56185 8.0625Z" fill="black" />
            </svg>
            <input
              className={styles.main_input_password}
              name="password"
              type={visible ? "text" : "password"}
              value={password}
              onChange={this.handleChange}
              required
            />
            <div className={styles.main_input_password_placeholder}>Enter your password</div>
          </div>
          <div type="submit" className={styles.main_button} onClick={this.submitHandler}>Sign In</div>

          <div className={styles.main_question_text}>Don't have an Account? <Link className={styles.main_link} to="/sign_up">Sign Up</Link></div>
        </div>
      </div>
    )
  }
}


export default Sign_in

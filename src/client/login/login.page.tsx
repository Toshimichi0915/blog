import { memo } from "react"
import { css } from "@emotion/react"
import { Theme } from "@mui/material"
import { InferGetServerSidePropsType } from "next"
import { getServerSideProps } from "@/pages/login"

export const Login = memo(function Login({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main css={loginStyles}>
      <h1 className="Login-Title">Login</h1>
      <form className="Login-Form" method="post" action="/api/auth/callback/credentials">
        <label className="Login-Username">
          <span className="Login-Label">Username</span>
          <input type="text" id="username" name="username" className="Login-Input" placeholder="username" />
        </label>
        <label className="Login-Password">
          <span className="Login-Label">Password</span>
          <input type="password" id="password" name="password" className="Login-Input" placeholder="password" />
        </label>
        <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
        <button type="submit" className="Login-Submit">
          Login
        </button>
      </form>
    </main>
  )
})

function loginStyles(theme: Theme) {
  return css`
    margin: 5%;

    & .Login-Title {
      padding-bottom: 10px;
      border-bottom: 1px solid ${theme.palette.primary.main};
      padding-left: 5%;
      margin-bottom: 0.6rem;
    }

    & .Login-Form {
      display: flex;
      flex-direction: column;
      gap: 30px;
      margin-top: 35px;
      border-radius: 3px;
      padding: 30px;
      margin-left: auto;
      margin-right: auto;
      width: fit-content;
    }

    & .Login-Input {
      border: none;
      background-color: transparent;
      font-size: ${theme.typography.body1.fontSize};
      text-align: right;

      &:focus {
        outline: none;
      }
    }

    & .Login-Username,
    & .Login-Password {
      display: flex;
      gap: 10px;
      justify-content: space-between;
      font-size: ${theme.typography.body1.fontSize};
      border-bottom: 1px solid ${theme.palette.divider};
    }

    & .Login-Submit {
      border: none;
      background-color: ${theme.palette.primary.main};
      color: ${theme.palette.primary.contrastText};
      font-size: ${theme.typography.body1.fontSize};
      padding: 10px 20px;
      border-radius: 3px;
      transition: background-color 0.2s ease-in-out;
      width: fit-content;
      margin-left: auto;

      &:hover {
        cursor: pointer;
        background-color: ${theme.palette.primary.light};
      }
    }
  `
}

import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const appApi=createApi(
    {
        reducerPath:'appApi',
        baseQuery:fetchBaseQuery({
            baseUrl:'http://localhost:5000'
        }),
        endpoints:(builder)=>({
            signUpUser:builder.mutation({
                query:(user)=>({
                    url:"/users/signUp",
                    method:'POST',
                    body:user
                })
            }),
            loginUser:builder.mutation({
                query:(user)=>({
                    url:"/users/login",
                    method:'POST',
                    body:user
                })

            }),
            logoutUser:builder.mutation({
                query:(payload)=>({
                    url:"/users/logout",
                    method:'POST',
                    body:payload
                })

            })
        })
    }
)

export const {useLoginUserMutation,useLogoutUserMutation,useSignUpUserMutation}=appApi
export default appApi
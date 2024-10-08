"use client"
import {FormEvent, useState} from "react";
import {authorizedFetch} from "@/Ultility/authorizedFetcher";
import { api, ApiEndpoint } from "@/api/const";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const Page = () => {


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!(event.target instanceof HTMLFormElement)) {
            console.log("Huh")
            return
        }


        if (!(event.target[0] instanceof HTMLInputElement)) {
            console.log("Huh")
            return
        }

        if (!(event.target[1] instanceof HTMLInputElement)) {
            console.log("Huh")
            return
        }


        const username : string = event.target[0].value
        const password : string = event.target[1].value

        const result = await fetch(`${api(ApiEndpoint.IDENTITY)}/Account/Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })

        if (result.ok) {
            const resultJson = await result.json();
            localStorage.setItem("token", resultJson["token"]);
            return;
        }
        console.log(await result.text())

    }

    const [weather, setWeather] = useState("");
    const [connection, setConnection] = useState<HubConnection>();

    const handleWeatherClicked = async () => {
        // const resp = await fetch("http://localhost:5205/api/WeatherForecast/Weather", {
        //     headers: {
        //         "Authorization": "Bearer " + localStorage.getItem("token")
        //     }
        // })

        const resp = await authorizedFetch(`${api(ApiEndpoint.IDENTITY)}/WeatherForecast/Weather`)
        const text = await resp.text()
        setWeather(text)
    }


    const handleWeatherClicked2 = async () => {

        const resp = await authorizedFetch(`${api(ApiEndpoint.NOTIFICATION)}/WeatherForecast/`)
        const text = await resp.text()
        setWeather(text)
    }

    const handleNotificationClicked = async () => {
        const resp = await authorizedFetch(`${api(ApiEndpoint.IDENTITY)}/Notification/Send`)
        const text = await resp.text()
        console.log(text)
    }

    async function connectToHub() {
        const connect = new HubConnectionBuilder()
            .withUrl(`${api(ApiEndpoint.NOTIFICATION)}/hub`, {
                accessTokenFactory: () => localStorage.getItem("token") as string
            })
            .configureLogging(LogLevel.Information)
            .build();

        setConnection(connect);

        connect.start()


    }

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} method="POST">
                <input type="text" name="username"/>
                <br/>
                <input type="text" name="password"/>
                <br/>
                <button type="submit">Sign In</button>
            </form>

            <div >
                <button onClick={handleWeatherClicked}>Get Weather</button>
                <button onClick={handleWeatherClicked2}>Get Weather</button>
                <button onClick={handleNotificationClicked}>Notif</button>
                <button onClick={connectToHub}>Connect</button>
                <div>
                    {weather}
                </div>
            </div>
        </div>
    )
}

export default Page
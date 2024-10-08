"use client"
import {FormEvent, useState} from "react";
import {authorizedFetch} from "@/Ultility/authorizedFetcher";
import { api, ApiEndpoint } from "@/api/const";

const Page = () => {
    const apiep = api(ApiEndpoint.IDENTITY);
    return (
        <div>
            <h1>Upload</h1>
            <form method="POST" encType="multipart/form-data" action={`${apiep}/MediaTest/Upload`}>
                <input type="file" name="file"/>
                <br/>
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default Page
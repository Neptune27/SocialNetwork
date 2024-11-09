import { useMemo } from "react"

const useUsername = () => {
    return localStorage.getItem("username")
}

export default useUsername
import { motion } from "framer-motion"
import React, { useState } from "react"
import axios from "axios"
import Header from "../components/Header"

const UploadPage = () => {
    const [uploadFile, setUploadFile] = useState<File | null>(null)
    const [progress, setProgress] = useState({started: false, percent: 0})
    const [msg, setMsg] = useState("")

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        setUploadFile(file)
    }

    const handleUpload = () => {
        if (!uploadFile) {
            setMsg("No file selected")
            return
        }
        // Append file to form data
        const fd = new FormData()
        fd.append('file', uploadFile)

        // Update progress state
        setMsg("Uploading...")
        setProgress((prevState) => {
            return {...prevState, started: true}
        })
        
        const url = "http://127.0.0.1:3000/file/upload"
        axios.post(url, fd, {
                onUploadProgress: (progressEvent) => {
                    setProgress((prevState) => {
                        return {...prevState, percent: progressEvent.progress! * 100}
                    })
                },
                headers: {
                    "Custom-Header": "value",
                }
            })
            .then((res) => {
                setMsg("Upload successful!")
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Upload File" />
            <main className="max-w-max mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Title and search input bar */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-100">Upload CSV File Here</h2>
                    </div>
                    {/* Upload component */}
                    <div className="overflow-x-auto">
                        <div className="divide-y divide-gray-700">
                            <div className="bg-gray-700 placeholder-gray-400 rounded-lg px-10 pr-4 py-2 text-center flex flex-col">
                                <input
                                    type="file"
                                    className="rounded mb-2"
                                    onChange={handleOnChange}
                                />
                                <button
                                    className="rounded-md bg-gray-800 text-blue-400 hover:text-blue-300 pr-4 py-2 mb-2"
                                    onClick={handleUpload}
                                >
                                    Upload
                                </button>
                                <progress
                                    className="max-w-max text-blue-400 rounded-md mb-2"
                                    max={100}
                                    value={progress.percent}
                                />
                                <span className="max-w-full rounded-md bg-gray-400 pr-4 py-2">
                                    {msg}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}

export default UploadPage
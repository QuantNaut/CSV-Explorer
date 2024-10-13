import { motion } from "framer-motion"
import { Search } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useSearchParams } from 'react-router-dom'
import axios from "axios"
import Header from "../components/Header"
import { FileData } from "../types"

const FileViewerPage = () => {
    // Retrieve the 'filename' query parameter value
    const [searchParams] = useSearchParams()
    const queryParam = searchParams.get('filename')

    const [searchTerm, setSearchTerm] = useState("")
    const [fileData, setFileData] = useState<FileData[] | null>(null)
    const [filteredFileData, setFilteredFileData] = useState(fileData)

    // Get file data via api call
    useEffect(() => {
        if(queryParam) {
            const url = `http://127.0.0.1:3000/file/${queryParam}`
            axios.get(url).then((response) => {
                setFileData(response.data.fileData)
            }).catch((error) => {
                console.error("Error fetching file data:", error)
            })
        }
    }, [])

    // Update filteredFileData when fileData changes
    useEffect(() => {
        if (fileData) {
            setFilteredFileData(fileData)
        }
    }, [fileData])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Get the search string
        const term = e.target.value.toLowerCase()
        setSearchTerm(term)
        // Filter list of files by filename
        const filteredFiles = fileData!.filter((file) =>
            file.post_id.toString().includes(term) ||
            file.id.toString().includes(term) ||
            file.name.toLowerCase().includes(term) ||
            file.email.toLowerCase().includes(term) ||
            file.body.toLowerCase().includes(term)
        )
        setFilteredFileData(filteredFiles)
    }

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="File Viewer" />
            {/* Display uploaded csv files */}
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Title and search input bar */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-100">CSV File Contents</h2>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search files..."
                                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleSearch}
                                value={searchTerm}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>
                    </div>
                    {/* Display table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            {/* Table heading */}
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'">Post Id</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'">Id</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'">Body</th>
                                </tr>
                            </thead>
                            {/* Table body */}
                            <tbody className="divide-y divide-gray-700">
                                {queryParam || queryParam === null ? (
                                        // If there is at least one row of data
                                        filteredFileData && filteredFileData.length > 0 ? (filteredFileData.map(file => (
                                        <motion.tr
                                            key={file.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                                                {file.post_id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{file.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{file.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{file.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{file.body}</td>
                                        </motion.tr>
                                    ))) : (
                                        // If there is no file data returned
                                        <motion.tr
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                                                No data found. Empty csv file.
                                            </td>
                                        </motion.tr>
                                    )
                                ) : (
                                    // If query paramter not found in url
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                                            No file selected for viewing. Please select one from the homepage.
                                        </td>
                                    </motion.tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}

export default FileViewerPage
import { motion } from "framer-motion"
import { Eye, Search, Trash2 } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Header from "../components/Header"
import { FileInfo } from "../types"

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [actionTaken, setActionTaken] = useState(false)
    const [fileList, setFileList] = useState<FileInfo[] | null>(null)
    const [filteredFileList, setFilteredFileList] = useState(fileList)

    // Get list of uploaded files via api call
    useEffect(() => {
        const url = "http://127.0.0.1:3000/file/list"
        axios.get(url).then((response) => {
            setFileList(response.data.files)
        }).catch((error) => {
            console.error("Error fetching file list:", error)
        })
        // Re-run API call in event of any upload/delete actions
        setActionTaken(false)
    }, [actionTaken])

    // Update filteredFileList when fileList changes
    useEffect(() => {
        if (fileList) {
            setFilteredFileList(fileList) // Set the filtered list based on the fileList
        }
    }, [fileList])

    // Search the list of files
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Get the search string
        const term = e.target.value.toLowerCase()
        setSearchTerm(term)
        // Filter list of files by filename
        const filteredFiles = fileList!.filter((file) => file.name.toLowerCase().includes(term))
        setFilteredFileList(filteredFiles)
    }

    // Delete a uploaded file via api call
    const handleOnClick = (filename: string) => {
        const url = `http://127.0.0.1:3000/file/delete/${filename}`
        axios.delete(url).then(() => {
            console.log("File has been removed.")
        }).catch((error) => {
            console.error("Error deleting file:", error)
        })
        setActionTaken(true)
    }

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Home" />
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
                        <h2 className="text-xl font-semibold text-gray-100">Uploaded CSV Files</h2>
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'">Uploaded</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'">Actions</th>
                                </tr>
                            </thead>
                            {/* Table body */}
                            <tbody className="divide-y divide-gray-700">
                                {/* If there are no uploaded files */}
                                {filteredFileList && filteredFileList.length === 0 && (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">No file has been uploaded yet</td>
                                    </motion.tr>
                                )}
                                {/* If there is at least 1 uploaded file */}
                                {filteredFileList && filteredFileList.length > 0 && filteredFileList.map(file => (
                                    <motion.tr
                                        key={file.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                                            {file.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{file.uploaded}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                            <Link to={"/view?filename="+file.name}>
                                                <button className='text-indigo-400 hover:text-indigo-300 mr-2'>
                                                    <Eye size={18} />
                                                </button>
                                            </Link>
                                            <button
                                                className='text-red-400 hover:text-red-300'
                                                onClick={() => handleOnClick(file.name)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}

export default HomePage
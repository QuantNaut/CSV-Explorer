import { motion } from "framer-motion"
import { Search } from "lucide-react"
import React, { useState } from "react"
import Header from "../components/Header"

const FILES = [
    { post_id: 10001, id: 10001, name: "test data 10001", email: "test10001@gmail.com", body: "test test test test" },
    { post_id: 10002, id: 10002, name: "test data 10002", email: "test10002@gmail.com", body: "test test test test" },
    { post_id: 10003, id: 10003, name: "test data 10003", email: "test10003@gmail.com", body: "test test test test" },
    { post_id: 20001, id: 20001, name: "test data 20001", email: "test20001@gmail.com", body: "test test test test" },
    { post_id: 20002, id: 20002, name: "test data 20002", email: "test20002@gmail.com", body: "test test test test" },
    { post_id: 20003, id: 20003, name: "test data 20003", email: "test20003@gmail.com", body: "test test test test" },
]

const FileViewerPage = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredFiles, setFilteredFiles] = useState(FILES)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Get the search string
        const term = e.target.value.toLowerCase()
        setSearchTerm(term)
        // Filter list of files by filename
        const filteredFiles = FILES.filter((file) =>
            file.post_id.toString().includes(term) ||
            file.id.toString().includes(term) ||
            file.name.toLowerCase().includes(term) ||
            file.email.toLowerCase().includes(term) ||
            file.body.toLowerCase().includes(term)
        )
        setFilteredFiles(filteredFiles)
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
                                {filteredFiles.map(file => (
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}

export default FileViewerPage
import React, { useEffect, useState } from 'react';
import DialogYesNo from '../common/DialogYesNo';
import {  requesConfigBannerAdmin, requestGetConfigAdmin, requestGetConfigBannerAdmin } from '../../client/apiRequest';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

const SetBanner = () => {
    const bannerFilePath = '/banner_links.json';
    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState('');
    const [sure, setSure] = useState(false);
    const userInfo = useSelector(state => state?.auth?.login?.userInfo);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        } else {
            getConfig();
        }
    }, [userInfo]);

    const getConfig = async () => {
        try {
            const res = await requestGetConfigAdmin();
            if (res?.status === "ok") {
                setLinks(res?.data?.bannerLinks || []);
            }
        } catch (error) {
            console.error("Error fetching config:", error);
        }
    };

    const handleChange = (e) => {
        setNewLink(e.target.value);
    };

    const handleAddLink = () => {
        if (newLink.trim() !== '') {
            setLinks([...links, newLink.trim()]);
            setNewLink('');
        }
    };

    const handleRemoveLink = (index) => {
        const updatedLinks = [...links];
        updatedLinks.splice(index, 1);
        setLinks(updatedLinks);
    };

    const onYes = async () => {
        if (!userInfo) return;

        const request = { bannerLinks: links };
        try {
            const res = await requesConfigBannerAdmin(userInfo.token, request);
            if (res?.status === "ok") {
                toast.success(res?.data);
                // Save to JSON file
                saveToFile(links);
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.error("Error saving banners:", error);
            toast.error("Failed to save banners");
        } finally {
            setSure(false);
        }
    };

    const saveToFile = (data) => {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        saveAs(blob, bannerFilePath);
    };


    return (
        <div className='p-4'>
            <h2 className={`text-xl font-semibold text-red-500 mb-2`}>Banner management</h2>
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    value={newLink}
                    onChange={handleChange}
                    placeholder="Enter new link URL"
                    className="border border-gray-300 rounded-md px-2 py-1 mr-2"
                />
                <div className="flex gap-2">
                    <button onClick={handleAddLink} className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600">Add Link</button>
                    <button onClick={() => setSure(true)} className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">Save</button>
                </div>
            </div>
            <div>
                <h3 className="font-semibold mb-2">Current Links:</h3>
                <ul>
                    {links.map((link, index) => (
                        <li key={index} className="flex items-center">
                            <div className="flex gap-2 items-center">
                                <input
                                    className='w-1/3 border outline-none p-1'

                                    value={link.substring(0, 10)}
                                    onChange={(e) => {
                                        const updatedLinks = [...links];
                                        updatedLinks[index] = e.target.value
                                        setLinks(updatedLinks);
                                    }}
                                />
                                <img src={link} alt="" className='w-20 h-auto' />
                                <button onClick={() => handleRemoveLink(index)} className="ml-2 text-red-500 hover:text-red-700">Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {sure && <DialogYesNo message={"Save banners"} onYes={onYes} onNo={() => setSure(false)} />}
        </div>
    );
};

export default SetBanner;

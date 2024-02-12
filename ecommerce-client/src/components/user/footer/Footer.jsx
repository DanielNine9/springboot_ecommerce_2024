import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-t from-gray-800 to-gray-900 text-white py-12">
            <div className="container mx-auto flex flex-wrap justify-between items-start">
                <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
                    <h2 className="text-lg font-bold mb-4">About Us</h2>
                    <p className="text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultricies nulla sit amet eros pulvinar, vitae.</p>
                </div>
                <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
                    <h2 className="text-lg font-bold mb-4">Quick Links</h2>
                    <ul className="text-sm">
                        <li><a href="#" className="hover:text-gray-400 transition-colors duration-300">Home</a></li>
                        <li><a href="#" className="hover:text-gray-400 transition-colors duration-300">Services</a></li>
                        <li><a href="#" className="hover:text-gray-400 transition-colors duration-300">About</a></li>
                        <li><a href="#" className="hover:text-gray-400 transition-colors duration-300">Contact</a></li>
                    </ul>
                </div>
                <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
                    <h2 className="text-lg font-bold mb-4">Follow Us</h2>
                    <div className="flex items-center">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 mr-4"><FaFacebookF /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 mr-4"><FaTwitter /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300"><FaInstagram /></a>
                    </div>
                </div>
                <div className="w-full lg:w-1/4">
                    <h2 className="text-lg font-bold mb-4">Contact Us</h2>
                    <p className="text-sm">123 Street Name, City, Country</p>
                    <p className="text-sm">Email: info@example.com</p>
                    <p className="text-sm">Phone: +123 456 7890</p>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-700"></div>
            <div className="container mx-auto mt-8 py-4 text-xs flex justify-between items-center">
                <div className="text-gray-400">
                    &copy; {new Date().getFullYear()} Your Website Name. All Rights Reserved.
                </div>
                <div className="text-gray-400">
                    Designed by <a href="#" className="hover:text-white transition-colors duration-300">Your Name</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

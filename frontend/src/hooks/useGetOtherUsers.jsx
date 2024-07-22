import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${BASE_URL}/api/v1/user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                });
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.error("Error fetching other users: ", error);
                if (error.response) {
                    console.error("Response data: ", error.response.data);
                    console.error("Response status: ", error.response.status);
                    console.error("Response headers: ", error.response.headers);
                }
            }
        }
        fetchOtherUsers();
    }, [dispatch]);
}

export default useGetOtherUsers;

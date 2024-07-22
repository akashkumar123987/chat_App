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
                const token = localStorage.getItem('authToken'); // Make sure you have the token
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log("other users -> ", res.data);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log('Error fetching other users:', error);
                if (error.response) {
                    console.log('Response data:', error.response.data);
                    console.log('Response status:', error.response.status);
                    console.log('Response headers:', error.response.headers);
                }
            }
        };

        fetchOtherUsers();
    }, [dispatch]); // Make sure to include dispatch in the dependency array
};

export default useGetOtherUsers;

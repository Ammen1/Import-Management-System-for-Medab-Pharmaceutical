import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../features/user/userSlice';
import { Timeline, Button } from 'flowbite-react';
import { HiArrowNarrowRight, HiCalendar } from 'react-icons/hi';
import Flags from 'country-flag-icons/react/3x2'

export default function DashMessageD() {
    const userInfo = useSelector(selectUserInfo);
    const [messages, setMessages] = useState([]);
    console.log(messages)

    useEffect(() => {
        if (userInfo?.id) {
            fetch(`http://localhost:8080/message/messages/all`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch messages');
                    }
                    return response.json();
                })
                .then(data => {
                    // Filter messages to include only those belonging to the current user
                    // const userMessages = data.filter(message => message.userId.id === userInfo.id );
                    setMessages(data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        }
    }, [userInfo?.id]);

    return (
        <div className="container w-full mx-auto px-4 py-8 ml-40 mt-14">
            <h1 className="text-3xl font-bold mb-4">Messages:</h1>
            <Timeline>
                {messages.map(message => (
                    <Timeline.Item key={message._id}>
                        <Timeline.Point icon={HiCalendar} />
                        <Timeline.Content>
                            <Timeline.Time>{new Date(message.sentAt).toLocaleString()}</Timeline.Time>
                            <Timeline.Title>{message.subject}</Timeline.Title>
                            <Timeline.Body>{message.message}</Timeline.Body>
                            <div className="mt-4">
                            <div className="text-xl text-white w-80 bg-gradient-to-r">
                                    <strong>User Role:</strong> {message.userId?.role}
                                </div>
                                <p className="text-sm text-gray-700">
                                    <strong>User Name:</strong> {message.userId?.name}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>User Email:</strong> {message.userId?.email}
                                </p>
                                <p className="text-sm text-gray-900 gap-8">
                                    <strong>Address:</strong> {message.userId.addresses[0]?.name}{" "}< br />
                                    <strong>state:</strong> {message.userId.addresses[0]?.state} {" "}< br />
                                    <strong>city:</strong> {message.userId.addresses[0]?.city}{" "}< br />
                                    <strong>phone:</strong> {message.userId.addresses[0]?.phone}<br />
                                   <h1 className=' w-44  text-white text-xl bg-gradient-to-r '> Ethiopia</h1>
                                    <div className=' -translate-x-20'><Flags.ET title="Ethiopia " className="  w-44 h-5 mt-5 "/></div>
                                </p> 
                                </div>
                        </Timeline.Content>
                    </Timeline.Item>
                ))}
            </Timeline>
        </div>
    );
}

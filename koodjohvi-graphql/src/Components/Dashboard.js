import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO, GET_USER_LEVEL, GET_USER_XP } from '../GraphQL/Queries';
import BarChart from '../Charts/BarChart';
import CircleWithLevel from "../Charts/UserLevel";
import AuditRatioBar from "../Charts/AuditBar";
import XPOverTimeChart from "../Charts/LineChart";
import TrimAccountCreated from "../Data_Quality/DateLengthEditor";
import TrimAuditRatio from "../Data_Quality/AuditRatioEditor";
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const navigate = useNavigate();
    let token;

    try {
        token = JSON.parse(localStorage.getItem('token')).value; // Retrieve JWT token value from localStorage, if available
    } catch (error) {
        navigate('/');
    }

    const { error: userInfoError, loading: userInfoLoading, data: userInfoData } = useQuery(GET_USER_INFO, {
        context: {
            headers: {
                Authorization: `Bearer ${token}` // JWT Bear Token
            }
        },
    });

    const userId = userInfoData?.user?.[0]?.id;

    const { error: userLevelError, loading: userLevelLoading, data: userLevelData } = useQuery(GET_USER_LEVEL, {
        variables: { userId },
        context: {
            headers: {
                Authorization: `Bearer ${token}` // JWT Bear Token
            }
        },
        skip: !userId, // Skip the query if userId is not available!!!
    });

    const { error: userXPError, loading: userXPLoading, data: userXPData } = useQuery(GET_USER_XP, {
        variables: { userId },
        context: {
            headers: {
                Authorization: `Bearer ${token}` // JWT Bear Token
            }
        },
        skip: !userId, // Skip the query if userId is not available!!!
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = "/";
    };

    if (userInfoLoading || userLevelLoading || userXPLoading) return <p>Loading...</p>;
    if (userInfoError) return <p>Error (info): {userInfoError.message}</p>;
    if (userLevelError) return <p>Error (level): {userLevelError.message}</p>;
    if (userXPError) return <p>Error (xp): {userXPError.message}</p>;

    const user = userInfoData && userInfoData.user && userInfoData.user[0];
    const project = userLevelData && userLevelData.transaction && userLevelData.transaction.length > 0 ? userLevelData.transaction[0] : null;
    const xpTransactions = userXPData && userXPData.transaction;

    // Data for graphs:
    const xpData = xpTransactions.map(transaction => transaction.amount);
    const xpLabels = xpTransactions.map(transaction => transaction.object.name);

    return (
        <div className='dashboard_container'>
            <div className='user_info'>
                <p className='title_p'>ID:</p>
                <p className='user_p' >{user.id}</p>
                <p className='title_p'>Login:</p>
                <p className='user_p'>{user.login}</p>
                <p className='title_p'>Account Created:</p>
                <p className='user_p'>{TrimAccountCreated(user.createdAt)}</p>
                <div className='user_level'>
                    <h1>User Level:</h1>
                    <CircleWithLevel level={project ? project.amount : "N/A"} />
                </div>
                <div className='user_ratio'>
                    <p className='user_p'>Audit Ratio: {TrimAuditRatio(user.auditRatio)}</p>
                    <AuditRatioBar auditRatio={user ? user.auditRatio : "N/A"} />
                </div>
                <button className="logout_button" onClick={handleLogout}>Logout</button>
            </div>
            <div className='charts'>
                <div className='project_info'>
                    {/* 1st chart */}
                    <h1>XP per Exercise:</h1>
                    <BarChart 
                    data={xpData}
                    labels={xpLabels}
                    width={xpData.length * 70} 
                    height={400} 
                    barColor="#ff6600" />         
                </div>
                <div className='user_xp'>
                    {/* chart numero 2 */}
                    <h1>XP Over Time:</h1>
                    <XPOverTimeChart xpData={xpTransactions} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

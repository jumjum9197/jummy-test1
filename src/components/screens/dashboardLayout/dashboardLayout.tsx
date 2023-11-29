
import React, { FC, useState, useCallback } from "react";
import { Drawer } from "@mui/material";
import NavHeader from "../../../components/dashboard/navbar";
// import Sidebar from "../../components/Dashboard/applicantDashboard/sideBar/sideBar";
import styles from './dashboardLayout.module.scss';
// import Header from "../../components/Dashboard/applicantDashboard/header/header";


const drawerWidth = 348;

interface ComponentProps {
    children: React.ReactNode;
    heading?: string;
    paragraph?: string;
}

interface Props {
    window?: () => Window;
}

const DashboardLayout : FC<ComponentProps & Props> = ({ children, heading, paragraph, window }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarToggle = useCallback(() => setSidebarOpen(!sidebarOpen), [sidebarOpen]);

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <div className={styles.container}>
            
            <div className={styles.navHeader}>
                <NavHeader />
                 {/* handleSidebarToggle={handleSidebarToggle} /> */}
            </div>
            {/* <div className={styles.header}>
                <Header heading={heading} paragraph={paragraph}/>
            </div> */}
            <Drawer
                className={styles.sidebar}
                container={container}
                variant='temporary'
                open={sidebarOpen}
                onClose={handleSidebarToggle}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    display: { xs: 'block', md: 'none'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
                }}
            >
                {/* <Sidebar /> */}
            </Drawer>
            <Drawer
                className={styles.sidebar}
               
                variant='permanent'
                sx={{
                    display: { xs: 'none', md: 'none' },
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
                }}
                open
            >
                {/* <Sidebar /> */}
            </Drawer>
        
            <div className={styles.main}>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;

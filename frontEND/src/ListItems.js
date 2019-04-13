import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PublicIcon from '@material-ui/icons/Public';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PetsIcon from '@material-ui/icons/Pets';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import Link from "@material-ui/core/es/Link/Link";
import { Link as RouterLink } from 'react-router-dom'

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <PetsIcon/>
            </ListItemIcon>
            <ListItemText primary="我的足迹" />
        </ListItem>
        <Link to="/news">
            <ListItem button>
                <ListItemIcon>
                    <PublicIcon/>
                </ListItemIcon>
            <ListItemText primary="校园新闻" />
            </ListItem>
        </Link>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="申请" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem>
    </div>
);

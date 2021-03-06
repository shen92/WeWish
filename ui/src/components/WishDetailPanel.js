import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SyncIcon from '@material-ui/icons/Sync';

import  { joinWish, finishWish, leaveWish, delWish, addCompletedPost }from '../firebase'

const useStyles = makeStyles({
    root: {
        marginTop: 16,
        marginLeft: 16,
        width: '40%',
        padding: 8,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    tag: {
        padding: "4px 8px",
        borderRadius: 8,
        backgroundColor: '#b0b0b0',
        color: 'white',
    },
    listItem: {
        border: '1px solid black',
        borderRadius: 8,
    }
})

function WishDetailPanel(props){
    const classes = useStyles();

    const wish = props.wishList[props.wishList.findIndex(wish => wish.name === props.targetWish)]


    const onFinishButtonClick = async() => {
        await finishWish(wish.name);
        await addCompletedPost(wish.name)
    }

    const onDropButtonClick = async() => {
        await delWish(wish.name);
        props.setTargetWish("")
    }

    const onJoinButtonClick = async() => {
        await joinWish(wish.name);
    }

    const onLeaveButtonClick = async() => {
        await leaveWish(wish.name);
    }

    return (
    <div className={classes.root}>
        <div style={{marginBottom: 8}}>
            <span className={classes.tag}>Wish</span>
            <div style={{display:'flex', alignItems: 'center', marginTop: 8, marginBottom: 8}}>
                <Typography variant="h5">{wish.name}</Typography>
                {wish.complete_time == null ? <SyncIcon style={{color: '#0384fc'}}/> : <CheckCircleIcon style={{color: '#11ba5a'}}/>}
            </div>
            <div style={{border: '1px solid black', padding: 8, marginBottom: 10}}>
                <Typography variant="subtitle1" style={{marginBottom: 60}}>{`${wish.name} Group`}</Typography>
                <Typography variant="subtitle1" style={{marginBottom: 60}}>{`People in this group also wish to accomplish the goal of ${wish.name}.`}</Typography>
                <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                    {wish.joined ?
                        <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={onLeaveButtonClick}
                    >
                        Leave
                    </Button> :
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={onJoinButtonClick}
                    >
                        Join
                    </Button>
                    }
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={onFinishButtonClick}
                    disabled={wish.complete_time != null}
                >
                    Accomplish
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={onDropButtonClick}
                    style={{marginLeft: 40}}
                    disabled={wish.complete_time != null}
                >
                    Drop
                </Button>
            </div>
        </div>
    </div>
    )
}

export default WishDetailPanel;

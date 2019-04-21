import firebase from 'firebase';
import {withStyles} from "@material-ui/core";

firebase.initializeApp({
    apiKey: 'AIzaSyBl9i4zCUV0-dmrm2EOg9Jxm7of4iTRjko',
    projectId: 'sfootprint2'
});

var db = firebase.firestore();

export default db;


import {getAddressCoordinates, getDistanceTime as getDistanceTimeRequired, getSuggestions} from "../services/maps.service.js"
import { validationResult } from "express-validator";

export const getCoordinates = async(req,res,next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {address} = req.query;
    
    try{
        const coordinates = await getAddressCoordinates(address);
        res.status(200).json(coordinates);
    }
    catch(error){
        res.status(404).json({message: "Coordinates not found"});
    }
}

export const getDistanceTime = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {pickup, destination} = req.query;

    try{
        const distanceTime = await getDistanceTimeRequired(pickup,destination);
        res.status(200).json(distanceTime);
    }
    catch(error){
        res.status(400).json({message: "Internal server error"});
    }
}

export const getAutoCompleteSuggestions = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {address} = req.query;
    
    try{
        const suggestions = await getSuggestions(address);
        res.status(200).json(suggestions);
    }
    catch(error){
        res.status(400).json({message: "Internal server error"});
    }
}
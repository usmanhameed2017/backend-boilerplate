const { frontendURL } = require("../constants");
const { getAccessToken, verifyAccessToken } = require("../utils/accessToken");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

// Authentication
const authentication = asyncHandler((request, response, next) => {
    const accessToken = getAccessToken(request);
    if(!accessToken)
    {
        return response.status(401)
        .json(new ApiResponse(401, { redirectURL: `${frontendURL}/login` }, "Unauthorized! Access token is missing"));
    }

    // Verify
    const user = verifyAccessToken(accessToken);
    if(!user)
    {
        return response.status(401)
        .json(new ApiResponse(401, { redirectURL: `${frontendURL}/login` }, "Unauthorized! Invalid access token"));
    }

    // Pass through
    request.user = user;
    return next();
});

// Authorization based on role
const authorization = (roles = []) => {
    return (request, response, next) => {
        if(!request.user) 
        {
            return response.status(401)
            .json(new ApiResponse(401, { redirectURL: `${frontendURL}/login` }, "Unauthorized!"));
        }

        if(!roles.includes(request.user.role))
        {
            return response.status(403)
            .json(new ApiResponse(403, { redirectURL: `${frontendURL}/forbidden` }, "Access denied!"));            
        }
        return next();
    }
};

module.exports = { authentication, authorization };
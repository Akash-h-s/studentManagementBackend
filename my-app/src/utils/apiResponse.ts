import { APIGatewayProxyResult } from 'aws-lambda';

export const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};


export const successResponse = (data: any, statusCode: number = 200): APIGatewayProxyResult => {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
        },
        body: JSON.stringify({
            success: true,
            ...data,
        }),
    };
};

export const errorResponse = (message: string, statusCode: number = 500, error?: any): APIGatewayProxyResult => {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
        },
        body: JSON.stringify({
            success: false,
            message,
            ...(error && { error: error.message || error }),
        }),
    };
};

export const optionsResponse = (): APIGatewayProxyResult => {
    return {
        statusCode: 200,
        headers: corsHeaders,
        body: '',
    };
};

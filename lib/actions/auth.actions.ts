'use server';

import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";

export const signUpWithEmail = async ({ email, fullName, password, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: { email, password, name: fullName }
        })
        if (response) {
            await inngest.send({
                name: 'app/user.created',
                data: { email ,name:fullName,country,preferredIndustry,investmentGoals,riskTolerance}
            })
        }
        return {success:true,data:response}
    } catch (e) {
        console.log('Sign up failed', e);
        return { success: false, error: 'Sign up failed' }
    }
}

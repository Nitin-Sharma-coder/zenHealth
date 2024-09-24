"use client" //"use client" is a directive used in Next.js, particularly in the context of its new app directory (introduced in Next.js 13). It indicates that the code in the file should be executed on the client side rather than the server side.

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,

} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',

}



const PatientForm = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
        setIsLoading(true);

        try {
            const userData = { name, email, phone }
            const user = await createUser(userData);
            console.log(user);

            if (user) router.push(`/patients/${user.$id}/register`)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className='header'>Hii there !</h1>
                    <p className="text-dark-700">Schedule Your First Appointment</p>
                </section>
                <CustomFormField
                    fieldType={FormFieldType.INPUT}//enum is used becoz it is hard to debug string error as it won't throw any error
                    control={form.control}
                    name='name'
                    label='Full Name'
                    placeholder='Nitin Sharma'
                    iconSrc='/assets/icons/user.svg'
                    iconAlt='user'
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}//enum is used becoz it is hard to debug string error as it won't throw any error
                    control={form.control}
                    name='email'
                    label='Email'
                    placeholder='nitinsharma@testing.com'
                    iconSrc='/assets/icons/email.svg'
                    iconAlt='email'
                />
                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}//enum is used becoz it is hard to debug string error as it won't throw any error
                    control={form.control}
                    name='phone'
                    label='Phone Number'
                    placeholder='(+91) 123 4567891'

                />
                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm
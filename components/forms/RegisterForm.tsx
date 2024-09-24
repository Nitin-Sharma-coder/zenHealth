"use client";//"use client" is a directive used in Next.js, particularly in the context of its new app directory (introduced in Next.js 13). It indicates that the code in the file should be executed on the client side rather than the server side.

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,

} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"


const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    // 1. Define your form.
    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: "",
            email: "",
            phone: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
        setIsLoading(true);


        // now we will collect all data and make it in way to store that in database
        let formData;

        // this ensures we have a file
        if (values.identificationDocument && values.identificationDocument.length > 0) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type,

            })
            formData = new FormData();
            formData.append('blobFile', blobFile);
            formData.append('fileName', values.identificationDocument[0].name);
        }
        //  now we will make this data in a way that this makes sense to appwrite to recieve
        try {
            const patientData = {
                ...values,
                userid: user.$id,
                birthDate: new Date(values.birthDate),
                identificationDocument: formData,

            }
            // @ts-ignore
            const patient = await registerPatient(patientData);
            if (patient) router.push(`/patients/${user.$id}/new-appointment`);
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className='header'>Welcome </h1>
                    <p className="text-dark-700">Let us know more about yourself.</p>
                </section>
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>
                </section>
                <CustomFormField
                    fieldType={FormFieldType.INPUT}//enum is used becoz it is hard to debug string error as it won't throw any error
                    control={form.control}
                    name='name'
                    label="Full Name"
                    placeholder='Nitin Sharma'
                    iconSrc='/assets/icons/user.svg'
                    iconAlt='user'
                />
                <div className="flex flex-col gap-6 xl:flex-row">
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
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}//enum is used becoz it is hard to debug string error as it won't throw any error
                        control={form.control}
                        name='birthDate'
                        label='Date of Birth'

                    />
                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}//skeleton allows to pass anything we want 
                        control={form.control}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOptions.map((option, i) => (
                                        <div key={option + i} className="radio-group">
                                            <RadioGroupItem value={option} id={option} />
                                            <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}//enum is used becoz it is hard to debug string error as it won't throw any error
                        control={form.control}
                        name='address'
                        label='Address'
                        placeholder="14th Street , New Delhi"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}//enum is used becoz it is hard to debug string error as it won't throw any error
                        control={form.control}
                        name='occupation'
                        label='Occupation'
                        placeholder='Software Engineer'

                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}//enum is used becoz it is hard to debug string error as it won't throw any error
                        control={form.control}
                        name='emergencyContactName'
                        label='Emergency Contact Name'
                        placeholder="Gaurdian's Name"

                    />
                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}//enum is used becoz it is hard to debug string error as it won't throw any error
                        control={form.control}
                        name='emergencyContactNumber'
                        label='Emergency Contact Number'
                        placeholder='(+91) 123 4567891'

                    />
                </div>
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Medical Information</h2>
                    </div>
                </section>
                <CustomFormField
                    fieldType={FormFieldType.SELECT}//enum is used becoz it is hard to debug string error as it won't throw any error
                    control={form.control}
                    name='primaryPhysician'
                    label='Primary Physician'
                    placeholder='Select a Physician'

                >
                    {
                        Doctors.map((doctor) => (
                            <SelectItem key={doctor.name}
                                value={doctor.name}>
                                <div className="flex cursor-pointer items-center gap-2">
                                    <Image
                                        src={doctor.image}
                                        width={32}
                                        height={32}
                                        alt={doctor.name}
                                        className="rounded-full border border-dark-500"
                                    />
                                    <p>{doctor.name}</p>
                                </div>
                            </SelectItem>
                        )

                        )
                    }
                </CustomFormField>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}//enum is used becoz it is hard to debug string error as it won't throw any error
                        control={form.control}
                        name='insuranceProvider'
                        label='Insurance Provider'
                        placeholder="BlueCross BlueShield"

                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}//enum is used becoz it is hard to debug string error as it won't throw any error
                        control={form.control}
                        name='insurancePolicyNumber'
                        label='Insurance Policy Number'
                        placeholder='ABC123456789'

                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}//enum is used becoz it is hard to debug string error as it won't throw any error
                        control={form.control}
                        name='allergies'
                        label='Allergies (if any)'
                        placeholder="Peanuts, Penicillin, Pollen, Gluten"

                    />
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}//enum is used becoz it is hard to debug string error as it won't throw any error
                        control={form.control}
                        name='currentMedication'
                        label='Current Medication'
                        placeholder='Clobetasol Propionate I.P. 0.05% w/w'

                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}//enum is used becoz it is hard to debug string error as it won't throw any error
                        control={form.control}
                        name='familyMedicalHistory'
                        label='Family Medical History'
                        placeholder="Mother has Brain Cancer, Father had Heart Attack"

                    />
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}//enum is used becoz it is hard to debug string error as it won't throw any error
                        control={form.control}
                        name='pastMedicalHistory'
                        label='Past Medical History'
                        placeholder='Appendectomy, Tonsillectomy'

                    />
                </div>
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Identification and Verification</h2>
                    </div>
                </section>
                <CustomFormField
                    fieldType={FormFieldType.SELECT}//enum is used becoz it is hard to debug string error as it won't throw any error
                    control={form.control}
                    name='identificationType'
                    label='Identification Type'
                    placeholder="Select an identification type."

                >
                    {
                        IdentificationTypes.map(type => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))
                    }
                </CustomFormField>
                <CustomFormField
                    fieldType={FormFieldType.INPUT}//enum is used becoz it is hard to debug string error as it won't throw any error
                    control={form.control}
                    name='identificationNumber'
                    label='Identification Number'
                    placeholder='123456789ABC'

                />
                <CustomFormField
                    fieldType={FormFieldType.SKELETON}//skeleton allows to pass anything we want 
                    control={form.control}
                    name="identificationDocument"
                    label="Scanned Copy of Identification Document"
                    renderSkeleton={(field) =>
                    (
                        <FormControl>
                            <FileUploader files={field.value} onChange={field.onChange} />
                        </FormControl>
                    )
                    }
                />
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Consent and Privacy</h2>
                    </div>
                </section>
                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name='treatmentConsent'
                    label="I consent to treatment"
                />
                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name='disclosureConsent'
                    label="I consent to disclosure of information"
                />
                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name='privacyConsent'
                    label="I consent to privacy policy"
                />

                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm
# ZenHealth - Patient Management System

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)
- [Future Improvements](#future-improvements)
- [Demo](#demo)

## Overview

**ZenHealth** is a comprehensive patient management system built with Next.js, TypeScript, TailwindCSS, and Twilio. This project enables healthcare providers to manage patient information efficiently, schedule appointments, and send real-time SMS notifications for confirmations and cancellations.

## Features

- **User Registration**: Patients can register and provide personal information.
- **Appointment Management**: Schedule, cancel, and view appointments.
- **Real-time Notifications**: Receive SMS notifications via Twilio for appointment updates.
- **Custom Forms**: Dynamic forms with validation using React Hook Form and Zod.
- **File Upload**: Upload identification documents securely.
- **Admin Panel**: Manage patients, doctors, and appointments with enhanced UI.
- **Metrics Tracking**: Monitor user interactions and performance with Sentry.

## Technologies Used

- **Next.js**: React framework for server-side rendering.
- **TypeScript**: Strongly typed language for better development experience.
- **TailwindCSS**: Utility-first CSS framework for custom styling.
- **Twilio**: SMS API for notifications.
- **Appwrite**: Backend server for database management.

## Installation

To get started with ZenHealth, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Nitin-Sharma-coder/zenHealth.git
   cd zenhealth
2. Install dependencies:
   ```bash
   npm install
3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the following variables:
     ```env
     NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
     APPWRITE_API_KEY=your_api_key
     TWILIO_ACCOUNT_SID=your_account_sid
     TWILIO_AUTH_TOKEN=your_auth_token
     TWILIO_PHONE_NUMBER=your_twilio_number
     ```
4. Run the application:
   ```bash
   npm run dev
5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Register as a Patient**: Fill out the registration form to create an account.
- **Schedule Appointments**: Use the patient dashboard to book and manage appointments.
- **Admin Features**: Admins can manage patient records, appointments, and send notifications.

## Deployment

Deploy your application on Vercel for easy hosting. Follow the Vercel documentation for deployment instructions.

## Acknowledgements

- **Next.js**: For providing an excellent framework for server-side rendering and building scalable applications.
- **TypeScript**: For enhancing code quality and maintainability through static typing.
- **TailwindCSS**: For enabling rapid UI development with utility-first CSS styling.
- **Twilio**: For their reliable APIs that facilitate real-time SMS notifications.
- **Appwrite**: For offering an easy-to-use backend solution for managing databases and user authentication.
- **React Hook Form**: For simplifying form handling and validation.
- **Zod**: For providing schema validation to ensure data integrity.
- **Sentry**: For monitoring and tracking application performance and errors.

## Contact

For inquiries or feedback, feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/nitin-sharma-coder/).

## Future Improvements

- Implement user roles for enhanced access control (e.g., doctors, patients, admin).
- Add a calendar integration for appointment scheduling.
- Enhance the UI/UX based on user feedback.
- Implement automated testing for better code reliability.
- Explore additional features like telemedicine or prescription management.

## Demo

Check out the live demo of the ZenHealth application [here]().


## FAQ

**Q: What is ZenHealth?**  
A: ZenHealth is a patient management system that allows healthcare providers to manage patient information, schedule appointments, and send real-time SMS notifications.

**Q: How can I register as a patient?**  
A: You can register by filling out the registration form on the homepage with your personal information.

**Q: Is ZenHealth suitable for small clinics?**  
A: Yes, ZenHealth is designed to be flexible and can be adapted to meet the needs of small to medium-sized clinics.

**Q: How are patient data secured?**  
A: Patient data is secured using industry-standard practices, including data encryption and access controls.

**Q: Where can I report issues or suggest improvements?**  
A: You can report issues or suggest improvements by creating an issue in the GitHub repository.

**Q: Can I use this application for my clinic?**  
A: Yes! The application can be customized to fit the needs of your healthcare practice.

## Use Cases

- **For Patients**: Easily manage appointments and receive timely notifications.
- **For Doctors**: Access patient records quickly and efficiently schedule appointments.
- **For Administrators**: Streamline operations and manage data effortlessly.


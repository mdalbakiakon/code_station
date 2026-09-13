# LMS Platform API Roadmap & Checklist

A living tracker of every API endpoint needed for a production-grade LMS, organized by module.

---

## 1. Auth

- [x] `POST /api/auth/register`
- [x] `POST /api/auth/login`
- [x] `POST /api/auth/logout`
- [ ] `POST /api/auth/refresh` — refresh token flow
- [x] `POST /api/auth/forgot-password`
- [x] `POST /api/auth/reset-password`
- [ ] `POST /api/auth/verify-email`
- [ ] `POST /api/auth/resend-verification`
- [x] Rate limiting middleware on forgot-password/reset-password

---

## 2. Users

- [x] `GET /api/users/me`
- [x] `PATCH /api/users/me`
- [x] `POST /api/users/me/upload-avatar`
- [x] `POST /api/users/me/upload-cover`
- [x] `PATCH /api/users/me/change-password`
- [x] `DELETE /api/users/me/delete-profile`
- [ ] `GET /api/instructors/me/courses` — instructor's own course list
- [ ] `GET /api/users/me/enrollments` — student's enrolled courses (see Enrollment module)

---

## 3. Courses

- [x] `POST /api/courses/` — create (admin only)
- [x] `GET /api/courses/` — list upcoming/ongoing
- [ ] `GET /api/courses/:id` — single course detail
- [ ] `PATCH /api/courses/:id` — update course
- [ ] `DELETE /api/courses/:id` — delete/archive course
- [ ] Search & filter (title, level, price range, instructor)
- [ ] Pagination on course list endpoints

---

## 4. Lessons

- [x] `GET /api/courses/:courseId/lessons` — list lessons for a course
- [x] `POST /api/courses/:courseId/lessons` — create lesson
- [ ] `GET /api/lessons/:id` — single lesson
- [ ] `PATCH /api/lessons/:id` — update lesson
- [ ] `DELETE /api/lessons/:id` — delete lesson
- [ ] `PATCH /api/courses/:courseId/lessons/reorder` — reorder lessons

---

## 5. Enrollment (not started)

- [ ] Enrollment model (student ↔ course, status, payment ref if paid)
- [ ] `POST /api/courses/:id/enroll`
- [ ] `DELETE /api/courses/:id/enroll` — unenroll/drop
- [ ] `GET /api/users/me/enrollments`
- [ ] `GET /api/courses/:id/students` — instructor/admin view of enrolled students

---

## 6. Progress Tracking (not started)

- [ ] Progress model (student, lesson, course, completed_at)
- [ ] `POST /api/lessons/:id/complete`
- [ ] `GET /api/courses/:id/progress` — student's progress in a course
- [ ] `GET /api/courses/:id/progress/summary` — instructor view of all students' progress

---

## 7. Assessments (not started)

- [ ] Quiz/Assignment model
- [ ] `POST /api/lessons/:id/quizzes` — create quiz
- [ ] `GET /api/lessons/:id/quizzes`
- [ ] `POST /api/quizzes/:id/submit` — student submission
- [ ] `GET /api/quizzes/:id/submissions` — instructor view
- [ ] `PATCH /api/submissions/:id/grade` — grading

---

## 8. Reviews & Ratings (not started)

- [ ] Review model (student, course, rating, comment)
- [ ] `POST /api/courses/:id/reviews`
- [ ] `GET /api/courses/:id/reviews`
- [ ] `DELETE /api/reviews/:id`

---

## 9. Payments (not started — only if courses are paid)

- [ ] Payment provider integration (e.g. Stripe)
- [ ] `POST /api/courses/:id/checkout` — create payment intent
- [ ] `POST /api/payments/webhook` — provider webhook handler
- [ ] `GET /api/users/me/orders` — order history

---

## 10. Certificates (not started)

- [ ] Certificate model
- [ ] `POST /api/courses/:id/certificate` — issue on completion
- [ ] `GET /api/users/me/certificates`

---

## 11. Admin / Analytics (not started)

- [ ] `GET /api/admin/stats` — enrollment counts, revenue, completion rates
- [ ] `GET /api/admin/users` — user management
- [ ] `PATCH /api/admin/users/:id/role` — role management

---

## 12. Cross-cutting Infrastructure

- [ ] Schema validation middleware (zod/joi) to replace manual field checks
- [ ] Centralized error-handling middleware (reduce repeated try/catch boilerplate)
- [ ] Consistent role-based-access middleware (currently some inline checks)
- [ ] Consistent pagination/sorting helper shared across list endpoints



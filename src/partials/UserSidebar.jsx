import React, { useState, useEffect, useRef } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import SidebarLinkGroup from "./SidebarLinkGroup"
import useUser from "../../hooks/useUser"
import TinyMiraclesLogo from "../images/tinymiracleswhite.webp"

// const translations = {
//   Dashboard: {
//     en: "Dashboard",
//     hi: "डैशबोर्ड",
//     mr: "डॅशबोर्ड",
//   },
//   Events: {
//     en: "Events",
//     hi: "आयोजन",
//     mr: "आयोजन",
//   },
// }

const languages = [
  { name: "English", code: "en" },
  { name: "हिन्दी", code: "hi" },
  { name: "मराठी", code: "mr" },
]

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { pathname } = useLocation()
  const { i18n, t } = useTranslation()

  const trigger = useRef(null)
  const sidebar = useRef(null)

  const { user } = useUser()
  const navigate = useNavigate()

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded")
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  )
  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate("/signin")
    }
    console.log(user.role);
    if (user.role !== "User") {
      navigate("/")
    }
  }, [user.role])

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener("keydown", keyHandler)
    return () => document.removeEventListener("keydown", keyHandler)
  })

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded)
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded")
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded")
    }
  }, [sidebarExpanded])

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between pr-3 mb-10 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/user/" className="block">
            <div className="flex justify-between items-center mr-auto w-32">
              <img
                className="object-cover object-center w-full h-full"
                src={TinyMiraclesLogo}
                alt="Logo"
              />
            </div>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="pl-3 text-xs font-semibold uppercase text-slate-500">
              <span
                className="hidden w-6 text-center lg:block lg:sidebar-expanded:hidden 2xl:hidden"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                {t("Pages")}
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}

              {/* All events */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname === "/user/" && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/user/"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname === "/user/"
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          pathname === "/user/"
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                      />
                      <path
                        className={`fill-current ${
                          pathname === "/user/"
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                      />
                    </svg>
                    <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                      {t("AllEvents")}
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Registered Events */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("/registered") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/user/registered"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("registered")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          pathname.includes("registered")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                      />
                      <path
                        className={`fill-current ${
                          pathname.includes("registered")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                      />
                    </svg>
                    <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                      {t("RegisteredEvents")}
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Tasks */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("tasks") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/user/tasks/"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("tasks")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          pathname.includes("tasks")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                      />
                      <path
                        className={`fill-current ${
                          pathname.includes("tasks")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M1 1h22v23H1z"
                      />
                      <path
                        className={`fill-current ${
                          pathname.includes("tasks")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                      />
                    </svg>
                    <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                      Tasks
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Messages */}

              {/* Calendar */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("calendar") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/user/calendar"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("calendar")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          pathname.includes("calendar")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M1 3h22v20H1z"
                      />
                      <path
                        className={`fill-current ${
                          pathname.includes("calendar")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z"
                      />
                    </svg>
                    <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                      {t("Calendar")}
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Settings */}
              <SidebarLinkGroup activecondition={pathname.includes("settings")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname.includes("settings")
                            ? "hover:text-slate-200"
                            : "hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleClick()
                          setSidebarExpanded(true)
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <svg
                              className="w-6 h-6 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current ${
                                  pathname.includes("settings")
                                    ? "text-indigo-500"
                                    : "text-slate-600"
                                }`}
                                d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname.includes("settings")
                                    ? "text-indigo-300"
                                    : "text-slate-400"
                                }`}
                                d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname.includes("settings")
                                    ? "text-indigo-500"
                                    : "text-slate-600"
                                }`}
                                d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname.includes("settings")
                                    ? "text-indigo-300"
                                    : "text-slate-400"
                                }`}
                                d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
                              />
                            </svg>
                            <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                              {t("MyProfile")}
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex ml-2 shrink-0">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1  ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/user/settings/account"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                {t("BasicDetails")}
                              </span>
                            </NavLink>
                          </li>

                          {/* { * 2nd level * } */}

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/user/settings/GovtID"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                {t("GovernmentIDs")}
                              </span>
                            </NavLink>
                          </li>

                          {/* { * 3 level *} */}

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/user/settings/EmploymentStatus"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                {t("EmploymentStatus")}
                              </span>
                            </NavLink>
                          </li>

                          {/* { * 4 level *} */}

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/user/settings/EducationStatus"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                {t("EducationStatus")}
                              </span>
                            </NavLink>
                          </li>

                          {/* { * 5 level *} */}

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/user/settings/SocioeconomicStatus"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                {t("SocioeconomicStatus")}
                              </span>
                            </NavLink>
                          </li>

                          {/* { * 6 level *} */}

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/user/settings/MedicalRecords"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                {t("MedicalRecords")}
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>

              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("contact") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/user/contact"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("contact")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center grow">
                      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                        <path
                          className={`fill-current ${
                            pathname.includes("contact")
                              ? "text-indigo-500"
                              : "text-slate-600"
                          }`}
                          d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
                        />
                        <path
                          className={`fill-current ${
                            pathname.includes("contact")
                              ? "text-indigo-300"
                              : "text-slate-400"
                          }`}
                          d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
                        />
                      </svg>
                      <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                        {t("Messages")}
                      </span>
                    </div>
                    {/* Badge */}
                  </div>
                </NavLink>
              </li>

              {/* FAQ */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("faqs") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/user/faqs"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("faqs")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                      <circle
                        className={`fill-current ${
                          pathname.includes("faqs")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        cx="18.5"
                        cy="5.5"
                        r="4.5"
                      />
                      <circle
                        className={`fill-current ${
                          pathname.includes("faqs")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        cx="5.5"
                        cy="5.5"
                        r="4.5"
                      />
                      <circle
                        className={`fill-current ${
                          pathname.includes("faqs")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        cx="18.5"
                        cy="18.5"
                        r="4.5"
                      />
                      <circle
                        className={`fill-current ${
                          pathname.includes("faqs")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        cx="5.5"
                        cy="18.5"
                        r="4.5"
                      />
                    </svg>
                    <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                      FAQ
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-auto text-white">
          <div className="flex flex-col gap-1 items-start">
            {languages.map((language) => (
              <span
                key={language.code}
                className={`transition-transform cursor-pointer hover:scale-110 font-semibold ${
                  i18n.language === language.code
                    ? "text-blue-400"
                    : "text-gray-400"
                }`}
                onClick={() => i18n.changeLanguage(language.code)}
              >
                {language.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";

type Page =
  | "home"
  | "dashboard"
  | "hospitals"
  | "hospital"
  | "booking"
  | "emergency"
  | "transport"
  | "login"
  | "patient-login"
  | "signup"
  | "forgot-password"
  | "admin-forgot"
  | "profile"
  | "appointments"
  | "admin-login"
  | "admin"
  | "admin-resources"
  | "admin-doctors"
  | "admin-appointments"
  | "admin-emergency"
  | "register-hospital"
  | "about"
  | "contact"
  | "help";

type LocationStatus = "idle" | "permission" | "locating" | "detected" | "denied" | "manual";
type UserLocation = {
  label: string;
  coords: { lat: number; lng: number } | null;
  status: LocationStatus;
};

type IconName =
  | "activity"
  | "ambulance"
  | "arrow"
  | "bed"
  | "bell"
  | "calendar"
  | "call"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "doctor"
  | "droplet"
  | "edit"
  | "heart"
  | "help"
  | "home"
  | "hospital"
  | "location"
  | "logout"
  | "mail"
  | "map"
  | "medicine"
  | "menu"
  | "oxygen"
  | "people"
  | "plus"
  | "search"
  | "settings"
  | "shield"
  | "star"
  | "user"
  | "video";

const paths: Record<IconName, ReactNode> = {
  activity: (
    <>
      <path d="M3 12h4l2-7 4 14 2-7h6" />
    </>
  ),
  ambulance: (
    <>
      <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
      <path d="M6 7V4h5v3M7 12h3M8.5 10.5v3" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  arrow: (
    <>
      <path d="m5 12 14 0M14 7l5 5-5 5" />
    </>
  ),
  bed: (
    <>
      <path d="M3 18V8M21 18v-6a3 3 0 0 0-3-3H9v9M3 14h18M6 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  call: (
    <>
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-4-1.5-6.5-4-8-8l2-2z" />
    </>
  ),
  check: (
    <>
      <path d="m5 12 4 4L19 6" />
    </>
  ),
  chevron: (
    <>
      <path d="m9 18 6-6-6-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  doctor: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2M9 14l3 3 3-3" />
    </>
  ),
  droplet: (
    <>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
    </>
  ),
  edit: (
    <>
      <path d="m14 5 5 5M4 20l4-1 11-11a2 2 0 0 0-3-3L5 16z" />
    </>
  ),
  heart: (
    <>
      <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.6 2.6 0 1 1 3.2 2.5c-.7.2-.7.9-.7 1.5M12 17h.01" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7" />
    </>
  ),
  hospital: (
    <>
      <path d="M5 21V4h14v17M2 21h20M9 8h6M12 5v6M9 15h2M13 15h2M10 21v-3h4v3" />
    </>
  ),
  location: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  logout: (
    <>
      <path d="M10 17l5-5-5-5M15 12H3M14 4h6v16h-6" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  map: (
    <>
      <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15" />
    </>
  ),
  medicine: (
    <>
      <path d="M9 4h6v4H9zM8 8h8l2 4v9H6v-9zM9 15h6M12 12v6" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  oxygen: (
    <>
      <circle cx="8" cy="15" r="5" />
      <circle cx="16" cy="8" r="4" />
      <path d="m11 12 2-2M16 12v7M13 19h6" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21v-2a7 7 0 0 1 14 0v2M16 5a4 4 0 0 1 0 7M18 15a6 6 0 0 1 4 6" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
  star: (
    <>
      <path d="m12 2 3 6 7 .9-5 4.8 1.3 6.8L12 17l-6.3 3.5L7 13.7 2 8.9 9 8z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m16 10 5-3v10l-5-3z" />
    </>
  ),
};

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const hospitals = [
  {
    name: "AIIMS Bhopal",
    area: "Saket Nagar, Bhopal",
    address: "Saket Nagar, Habibganj, Bhopal, MP 462020",
    distance: "2.1 km",
    distanceValue: 2.1,
    rating: "4.7",
    reviews: "3.6k",
    beds: 18,
    icu: 6,
    doctors: 24,
    ambulance: true,
    oxygen: true,
    emergency: true,
    type: "Government Super Speciality",
    image: "/hospital-hero.png",
    marker: { left: "61%", top: "36%" },
  },
  {
    name: "Bansal Hospital",
    area: "Shahpura, Bhopal",
    address: "C-Sector, Shahpura, Bhopal, MP 462016",
    distance: "3.8 km",
    distanceValue: 3.8,
    rating: "4.6",
    reviews: "2.1k",
    beds: 12,
    icu: 4,
    doctors: 18,
    ambulance: true,
    oxygen: true,
    emergency: true,
    type: "Multi Speciality",
    image: "/hospital-hero.png",
    marker: { left: "38%", top: "29%" },
  },
  {
    name: "Hamidia Hospital",
    area: "Royal Market, Bhopal",
    address: "Sultania Road, Royal Market, Bhopal, MP 462001",
    distance: "5.4 km",
    distanceValue: 5.4,
    rating: "4.3",
    reviews: "4.2k",
    beds: 9,
    icu: 2,
    doctors: 31,
    ambulance: true,
    oxygen: true,
    emergency: true,
    type: "Government Hospital",
    image: "/hospital-hero.png",
    marker: { left: "23%", top: "55%" },
  },
  {
    name: "Chirayu Medical College and Hospital",
    area: "Bairagarh, Bhopal",
    address: "Bhopal–Indore Highway, Bairagarh, Bhopal, MP 462030",
    distance: "11.6 km",
    distanceValue: 11.6,
    rating: "4.4",
    reviews: "1.7k",
    beds: 16,
    icu: 3,
    doctors: 20,
    ambulance: false,
    oxygen: true,
    emergency: true,
    type: "Teaching Hospital",
    image: "/hospital-hero.png",
    marker: { left: "12%", top: "70%" },
  },
];

const doctors = [
  {
    name: "Dr. Ananya Mehta",
    role: "Cardiologist",
    exp: "14 years experience",
    time: "09:00 AM – 01:00 PM",
    initials: "AM",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Dr. Rohan Kapoor",
    role: "Neurologist",
    exp: "11 years experience",
    time: "02:00 PM – 06:00 PM",
    initials: "RK",
    color: "bg-teal-100 text-teal-700",
  },
  {
    name: "Dr. Priya Nair",
    role: "General Physician",
    exp: "9 years experience",
    time: "10:00 AM – 04:00 PM",
    initials: "PN",
    color: "bg-purple-100 text-purple-700",
  },
];

const resources = [
  {
    icon: "bed" as IconName,
    label: "General beds",
    value: "12 / 86",
    note: "Available now",
    tone: "blue",
  },
  {
    icon: "activity" as IconName,
    label: "ICU beds",
    value: "4 / 20",
    note: "Limited availability",
    tone: "amber",
  },
  {
    icon: "oxygen" as IconName,
    label: "Medical oxygen",
    value: "Available",
    note: "Central supply active",
    tone: "teal",
  },
  {
    icon: "medicine" as IconName,
    label: "Essential medicines",
    value: "In stock",
    note: "Updated 8 min ago",
    tone: "green",
  },
];

const routeMap: Record<string, Page> = {
  "/": "home",
  "/dashboard": "dashboard",
  "/hospitals": "hospitals",
  "/hospital": "hospital",
  "/booking": "booking",
  "/emergency": "emergency",
  "/transport": "transport",
  "/login": "login",
  "/patient-login": "patient-login",
  "/signup": "signup",
  "/forgot-password": "forgot-password",
  "/admin-forgot": "admin-forgot",
  "/profile": "profile",
  "/appointments": "appointments",
  "/admin-login": "admin-login",
  "/admin": "admin",
  "/admin/resources": "admin-resources",
  "/admin/doctors": "admin-doctors",
  "/admin/appointments": "admin-appointments",
  "/admin/emergency": "admin-emergency",
  "/register-hospital": "register-hospital",
  "/about": "about",
  "/contact": "contact",
  "/help": "help",
};
const pagePath = Object.fromEntries(
  Object.entries(routeMap).map(([key, value]) => [value, key]),
) as Record<Page, string>;

function App() {
  const [page, setPage] = useState<Page>(() => routeMap[window.location.pathname] || "home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [location, setLocation] = useState<UserLocation>({
    label: "Bhopal, Madhya Pradesh",
    coords: { lat: 23.2599, lng: 77.4126 },
    status: "permission",
  });
  const navigate = (next: Page) => {
    window.history.pushState({}, "", pagePath[next]);
    setPage(next);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const back = () => setPage(routeMap[window.location.pathname] || "home");
    window.addEventListener("popstate", back);
    return () => window.removeEventListener("popstate", back);
  }, []);
  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  };
  const adminPage = page.startsWith("admin") && page !== "admin-login";
  const locationEnabled = (["home", "dashboard", "hospitals"] as Page[]).includes(page);

  return (
    <div className="min-h-screen bg-[#f7fafc] text-slate-900">
      {adminPage ? (
        <AdminShell page={page} navigate={navigate} notify={notify} />
      ) : (
        <>
          <Header
            page={page}
            navigate={navigate}
            mobileMenu={mobileMenu}
            setMobileMenu={setMobileMenu}
          />
          <main>
            {page === "home" && (
              <Landing navigate={navigate} location={location} setLocation={setLocation} />
            )}
            {page === "dashboard" && (
              <Dashboard navigate={navigate} location={location} setLocation={setLocation} />
            )}
            {page === "hospitals" && (
              <HospitalList
                navigate={navigate}
                location={location}
                setLocation={setLocation}
                notify={notify}
              />
            )}
            {page === "hospital" && <HospitalDetails navigate={navigate} notify={notify} />}
            {page === "booking" && <Booking navigate={navigate} />}
            {page === "emergency" && (
              <Emergency navigate={navigate} notify={notify} location={location} />
            )}
            {page === "transport" && <Transport notify={notify} />}
            {page === "login" && <AuthSelection navigate={navigate} />}
            {(page === "patient-login" || page === "signup" || page === "admin-login") && (
              <AuthForm mode={page} navigate={navigate} />
            )}
            {(page === "forgot-password" || page === "admin-forgot") && (
              <ForgotPassword admin={page === "admin-forgot"} navigate={navigate} />
            )}
            {page === "profile" && <Profile notify={notify} />}
            {page === "appointments" && <Appointments navigate={navigate} />}
            {page === "register-hospital" && <HospitalRegistration navigate={navigate} />}
            {page === "about" && <InfoPage type="about" />}
            {page === "contact" && <InfoPage type="contact" notify={notify} />}
            {page === "help" && <InfoPage type="help" />}
          </main>
          <Footer navigate={navigate} />
        </>
      )}
      {locationEnabled &&
        (["permission", "locating", "denied"] as LocationStatus[]).includes(location.status) && (
          <LocationPermission location={location} setLocation={setLocation} />
        )}
      {locationEnabled && location.status === "manual" && (
        <ManualLocation location={location} setLocation={setLocation} />
      )}
      {toast && (
        <div className="toast">
          <span className="icon-tile success">
            <Icon name="check" size={17} />
          </span>
          {toast}
        </div>
      )}
    </div>
  );
}

function LocationPermission({
  location,
  setLocation,
}: {
  location: UserLocation;
  setLocation: (value: UserLocation) => void;
}) {
  const detectLocation = () => {
    setLocation({ ...location, status: "locating" });
    if (!navigator.geolocation) {
      setLocation({ ...location, status: "denied" });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        let label = "Bhopal, Madhya Pradesh";
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`,
          );
          const place = await response.json();
          const city = place.city || place.locality || place.principalSubdivision;
          label = [city, place.principalSubdivision]
            .filter((x, i, arr) => x && arr.indexOf(x) === i)
            .join(", ");
        } catch {
          label = `${coords.latitude.toFixed(3)}, ${coords.longitude.toFixed(3)}`;
        }
        setLocation({
          label,
          coords: { lat: coords.latitude, lng: coords.longitude },
          status: "detected",
        });
      },
      () => setLocation({ ...location, status: "denied" }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 120000 },
    );
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Location access">
      <div className="location-modal">
        {location.status === "locating" ? (
          <div className="py-4 text-center">
            <span className="location-loader">
              <Icon name="location" size={27} />
            </span>
            <h2 className="mt-6 text-xl font-extrabold">Detecting your location…</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Finding your coordinates and nearby hospitals.
            </p>
            <div className="loading-track mt-7">
              <span />
            </div>
          </div>
        ) : location.status === "denied" ? (
          <div className="text-center">
            <span className="icon-tile red large mx-auto">
              <Icon name="location" size={25} />
            </span>
            <h2 className="mt-5 text-xl font-extrabold">Location access is turned off</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enable location in your browser settings, or choose an area manually to see nearby
              hospitals.
            </p>
            <button
              onClick={() => setLocation({ ...location, status: "manual" })}
              className="btn btn-primary mt-6 w-full"
            >
              Select location manually
            </button>
            <button
              onClick={() => setLocation({ ...location, status: "idle" })}
              className="btn btn-ghost mt-2 w-full"
            >
              Continue with Bhopal
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <span className="location-illustration">
                <Icon name="location" size={29} />
                <span className="radar-ring" />
              </span>
              <button
                aria-label="Close location request"
                onClick={() => setLocation({ ...location, status: "idle" })}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <h2 className="mt-6 text-xl font-extrabold">Find the closest care to you</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Allow location access to automatically discover hospitals and resources around you.
              You can change this anytime.
            </p>
            <div className="mt-5 flex gap-3 rounded-xl bg-blue-50 p-4 text-xs leading-5 text-blue-900">
              <Icon name="shield" size={18} className="shrink-0 text-blue-600" />
              Your location is used only to calculate nearby care and is not stored.
            </div>
            <button onClick={detectLocation} className="btn btn-primary mt-6 w-full">
              <Icon name="location" size={17} /> Allow location access
            </button>
            <button
              onClick={() => setLocation({ ...location, status: "idle" })}
              className="btn btn-ghost mt-2 w-full"
            >
              Not now
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ManualLocation({
  location,
  setLocation,
}: {
  location: UserLocation;
  setLocation: (value: UserLocation) => void;
}) {
  const [value, setValue] = useState(location.label);
  const suggestions = [
    "Bhopal, Madhya Pradesh",
    "Arera Colony, Bhopal",
    "Shahpura, Bhopal",
    "Saket Nagar, Bhopal",
  ];
  const save = (label: string) =>
    setLocation({
      label,
      coords: label.includes("Bhopal") ? { lat: 23.2599, lng: 77.4126 } : null,
      status: "detected",
    });
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Select location">
      <div className="location-modal">
        <div className="flex items-center justify-between">
          <div>
            <div className="section-eyebrow">Manual location</div>
            <h2 className="mt-2 text-xl font-extrabold">Choose your area</h2>
          </div>
          <button
            onClick={() => setLocation({ ...location, status: "idle" })}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="search-box mt-6 min-h-12 border bg-slate-50 shadow-none">
          <Icon name="search" size={18} className="text-slate-400" />
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter city, area or pincode"
          />
        </div>
        <div className="mt-4 space-y-1">
          {suggestions
            .filter((x) => x.toLowerCase().includes(value.toLowerCase()) || !value)
            .map((place) => (
              <button onClick={() => save(place)} className="location-suggestion" key={place}>
                <span className="icon-tile blue">
                  <Icon name="location" size={16} />
                </span>
                <span>
                  <b>{place.split(",")[0]}</b>
                  <small>{place}</small>
                </span>
                <Icon name="chevron" size={15} className="ml-auto text-slate-300" />
              </button>
            ))}
        </div>
        <button
          onClick={() => save(value || "Bhopal, Madhya Pradesh")}
          className="btn btn-primary mt-5 w-full"
        >
          Use this location
        </button>
      </div>
    </div>
  );
}

function LocationSearch({
  location,
  setLocation,
  onSearch,
  compact = false,
}: {
  location: UserLocation;
  setLocation: (value: UserLocation) => void;
  onSearch: () => void;
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  return (
    <div className={`location-search ${compact ? "compact" : ""}`}>
      <div className="location-search-main">
        <Icon name="search" className="shrink-0 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your location or find hospitals near you"
          aria-label="Enter your location"
        />
        <button
          onClick={() => setLocation({ ...location, status: "manual" })}
          className="change-location"
        >
          Change
        </button>
      </div>
      <button
        onClick={() => setLocation({ ...location, status: "permission" })}
        className="gps-button"
      >
        <Icon name="location" size={17} /> <span>Use My Current Location</span>
      </button>
      <button onClick={onSearch} className="btn btn-primary location-submit">
        Find hospitals
      </button>
      <div className="detected-location">
        <span className={`live-dot ${location.status === "denied" ? "red" : ""}`} />
        <span>
          <small>Your location</small>
          <b>{location.label}</b>
        </span>
      </div>
    </div>
  );
}

function Logo({ onClick, inverse = false }: { onClick?: () => void; inverse?: boolean }) {
  return (
    <button className="flex items-center gap-2.5 text-left" onClick={onClick}>
      <span className="logo-mark">
        <Icon name="plus" size={21} />
      </span>
      <span>
        <span
          className={`block text-[19px] font-extrabold leading-5 tracking-[-.03em] ${inverse ? "text-white" : "text-slate-900"}`}
        >
          Swasthya<span className="text-[#1976d2]">Connect</span>
        </span>
        <span
          className={`text-[9px] font-semibold uppercase tracking-[.16em] ${inverse ? "text-slate-400" : "text-slate-400"}`}
        >
          Care without barriers
        </span>
      </span>
    </button>
  );
}

function Header({
  page,
  navigate,
  mobileMenu,
  setMobileMenu,
}: {
  page: Page;
  navigate: (p: Page) => void;
  mobileMenu: boolean;
  setMobileMenu: (v: boolean) => void;
}) {
  const nav = [
    ["home", "Home"],
    ["hospitals", "Find Hospitals"],
    ["appointments", "Appointments"],
    ["transport", "Ambulance"],
  ] as [Page, string][];
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="site-container flex h-[76px] items-center justify-between">
        <Logo onClick={() => navigate("home")} />
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map(([key, label]) => (
            <button
              key={key}
              onClick={() => navigate(key)}
              className={`nav-link ${page === key ? "active" : ""}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="hidden items-center gap-2.5 md:flex">
          <button className="btn btn-emergency" onClick={() => navigate("emergency")}>
            <Icon name="activity" size={17} /> Emergency SOS
          </button>
          <button className="btn btn-ghost" onClick={() => navigate("login")}>
            Sign in
          </button>
          <button className="btn btn-primary" onClick={() => navigate("signup")}>
            Create account
          </button>
        </div>
        <button
          className="md:hidden"
          aria-label="Open menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <Icon name={mobileMenu ? "close" : "menu"} />
        </button>
      </div>
      {mobileMenu && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
          {nav.map(([key, label]) => (
            <button
              key={key}
              onClick={() => navigate(key)}
              className="block w-full border-b border-slate-50 py-3 text-left text-sm font-semibold"
            >
              {label}
            </button>
          ))}
          <button className="btn btn-emergency mt-4 w-full" onClick={() => navigate("emergency")}>
            Emergency SOS
          </button>
          <button className="btn btn-primary mt-2 w-full" onClick={() => navigate("login")}>
            Sign in
          </button>
        </div>
      )}
    </header>
  );
}

function Landing({
  navigate,
  location,
  setLocation,
}: {
  navigate: (p: Page) => void;
  location: UserLocation;
  setLocation: (value: UserLocation) => void;
}) {
  const quick = [
    ["hospital", "Find hospitals", "Nearby care, live resources", "hospitals"],
    ["calendar", "Book appointment", "Choose a doctor and time", "booking"],
    ["bed", "Check bed availability", "ICU and general beds", "hospitals"],
    ["doctor", "Find doctors", "Specialists near you", "hospital"],
    ["ambulance", "Ambulance services", "Fast emergency transport", "transport"],
  ] as [IconName, string, string, Page][];
  return (
    <>
      <section className="hero">
        <div className="site-container grid min-h-[590px] items-center gap-12 py-16 lg:grid-cols-[1.04fr_.96fr] lg:py-20">
          <div className="relative z-10">
            <div className="eyebrow">
              <span className="live-dot" /> Location-aware hospital discovery
            </div>
            <h1 className="mt-5 max-w-2xl text-[42px] font-extrabold leading-[1.08] tracking-[-.045em] text-slate-950 sm:text-[54px] lg:text-[62px]">
              Find the right hospital,{" "}
              <span className="text-gradient">when every second matters.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-7 text-slate-600">
              Location-aware access to beds, doctors, oxygen and emergency care information when you
              need it most.
            </p>
            <div className="mt-8">
              <LocationSearch
                location={location}
                setLocation={setLocation}
                onSearch={() => navigate("hospitals")}
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="text-xs font-medium text-slate-400">Quick filters:</span>
              {["ICU beds", "Oxygen", "24×7 doctors", "Ambulance"].map((x) => (
                <button key={x} onClick={() => navigate("hospitals")} className="filter-chip">
                  {x}
                </button>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-2">
                <Icon name="shield" size={17} className="text-teal-600" /> Trusted hospital network
              </span>
              <span className="flex items-center gap-2">
                <Icon name="clock" size={17} className="text-teal-600" /> Built for timely updates
              </span>
              <span className="flex items-center gap-2">
                <Icon name="call" size={17} className="text-teal-600" /> 24×7 support
              </span>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="hero-image">
              <img src="/hospital-hero.png" alt="Modern hospital and care team" />
              <div className="hero-shade" />
            </div>
            <div className="floating-card top-8 -left-9">
              <span className="icon-tile success">
                <Icon name="bed" />
              </span>
              <div>
                <b>12 beds available</b>
                <small>AIIMS Bhopal · 2.1 km</small>
              </div>
            </div>
            <div className="floating-card -bottom-6 right-5">
              <span className="avatar-sm">AM</span>
              <div>
                <b>Doctor available now</b>
                <small>Dr. Ananya · Cardiologist</small>
              </div>
              <span className="live-dot ml-4" />
            </div>
            <button onClick={() => navigate("emergency")} className="sos-orb">
              <Icon name="activity" size={28} />
              <b>SOS</b>
              <small>Tap for help</small>
            </button>
          </div>
        </div>
      </section>

      <section className="site-container relative z-10 -mt-3 pb-24">
        <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-blue-900/5 sm:grid-cols-2 lg:grid-cols-5">
          {quick.map(([icon, title, desc, route], i) => (
            <button
              onClick={() => navigate(route)}
              key={title}
              className={`quick-card ${i < quick.length - 1 ? "lg:border-r" : ""}`}
            >
              <span className="icon-tile blue">
                <Icon name={icon} />
              </span>
              <span>
                <b>{title}</b>
                <small>{desc}</small>
              </span>
              <Icon name="chevron" size={16} className="ml-auto text-slate-300" />
            </button>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <div className="site-container">
          <SectionHead
            eyebrow="Simple. Fast. Reliable."
            title="Care in three simple steps"
            subtitle="From finding the right hospital to getting confirmed care, we make every step clear."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              [
                "search",
                "01",
                "Search your need",
                "Tell us your location and what kind of medical care or resource you need.",
              ],
              [
                "hospital",
                "02",
                "Compare live availability",
                "View hospital profiles, reported bed status, doctors, oxygen, and distance.",
              ],
              [
                "check",
                "03",
                "Connect and get care",
                "Book an appointment, call the hospital, or request emergency transport.",
              ],
            ].map(([icon, no, title, desc]) => (
              <div className="step-card" key={no}>
                <span className="step-number">{no}</span>
                <span className="icon-tile blue large">
                  <Icon name={icon as IconName} size={25} />
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionHead
              align="left"
              eyebrow="Care around you"
              title="Featured nearby hospitals"
              subtitle="Explore sample resource availability from healthcare providers around Bhopal."
            />
            <button className="btn btn-outline" onClick={() => navigate("hospitals")}>
              View all hospitals <Icon name="arrow" size={17} />
            </button>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {hospitals.map((h) => (
              <HospitalCard key={h.name} h={h} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#0c2744] text-white">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="eyebrow dark">Why CurePlus</div>
            <h2 className="mt-5 text-4xl font-extrabold tracking-tight">
              Built for clarity when it matters most.
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-slate-300">
              We bring hospital information, care teams, and emergency services into one dependable
              experience.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["shield", "Clear information"],
                ["clock", "Real-time updates"],
                ["location", "Location intelligence"],
                ["heart", "Patient-first design"],
              ].map(([icon, text]) => (
                <div className="flex items-center gap-3" key={text}>
                  <span className="icon-tile teal">
                    <Icon name={icon as IconName} />
                  </span>
                  <span className="font-semibold">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["120+", "Partner hospitals"],
              ["42k+", "Patients assisted"],
              ["18 min", "Avg. response time"],
              ["24×7", "Care discovery"],
            ].map(([a, b]) => (
              <div className="stat-dark" key={b}>
                <strong>{a}</strong>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className="section-eyebrow">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-extrabold tracking-[-.03em] text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 leading-7 text-slate-500">{subtitle}</p>
    </div>
  );
}

function HospitalCard({
  h,
  navigate,
}: {
  h: (typeof hospitals)[number];
  navigate: (p: Page) => void;
}) {
  return (
    <article className="hospital-card">
      <div className="relative h-48 overflow-hidden">
        <img src={h.image} alt={h.name} />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-blue-700 shadow">
          {h.type}
        </span>
        <span className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold">
          <Icon name="star" size={13} className="fill-amber-400 text-amber-400" />
          {h.rating}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold">{h.name}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
          <Icon name="location" size={15} /> {h.area} · {h.distance}
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2 border-y border-slate-100 py-4">
          <ResourceMini icon="bed" value={h.beds ? `${h.beds} beds` : "Full"} active={!!h.beds} />
          <ResourceMini icon="activity" value={`${h.icu} ICU`} active={h.icu > 1} />
          <ResourceMini icon="oxygen" value="Oxygen" active />
        </div>
        <button onClick={() => navigate("hospital")} className="btn btn-soft mt-5 w-full">
          View availability <Icon name="arrow" size={16} />
        </button>
      </div>
    </article>
  );
}

function ResourceMini({
  icon,
  value,
  active,
}: {
  icon: IconName;
  value: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-1 text-[11px] font-semibold ${active ? "text-teal-700" : "text-red-500"}`}
    >
      <Icon name={icon} size={18} />
      <span>{value}</span>
    </div>
  );
}

function Dashboard({
  navigate,
  location,
  setLocation,
}: {
  navigate: (p: Page) => void;
  location: UserLocation;
  setLocation: (value: UserLocation) => void;
}) {
  return (
    <div className="page-wrap">
      <div className="site-container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-600">Monday, 24 June</p>
            <h1 className="page-title">Good morning, Aarav</h1>
            <p className="mt-1 text-slate-500">Here’s an overview of healthcare near you.</p>
          </div>
          <button onClick={() => navigate("profile")} className="profile-chip">
            <span className="avatar">AS</span>
            <span className="hidden text-left sm:block">
              <b>Aarav Sharma</b>
              <small>Patient ID #SC2841</small>
            </span>
            <Icon name="chevron" size={16} />
          </button>
        </div>
        <div className="mt-9 grid gap-6 lg:grid-cols-[1.55fr_.45fr]">
          <div className="panel p-5 sm:p-7">
            <h2 className="panel-title">Find care near you</h2>
            <div className="mt-5">
              <LocationSearch
                location={location}
                setLocation={setLocation}
                onSearch={() => navigate("hospitals")}
                compact
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["ICU beds", "General beds", "Oxygen", "Medicines", "Doctors", "Ambulance"].map(
                (x) => (
                  <button className="filter-pill" key={x}>
                    {x}
                  </button>
                ),
              )}
            </div>
          </div>
          <button onClick={() => navigate("emergency")} className="emergency-panel">
            <span className="rounded-full bg-white/15 p-3">
              <Icon name="activity" size={25} />
            </span>
            <span>
              <b>Need emergency help?</b>
              <small>SOS assistance available 24×7</small>
            </span>
            <Icon name="arrow" />
          </button>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_.5fr]">
          <section>
            <div className="flex items-center justify-between">
              <h2 className="panel-title">Hospitals near you</h2>
              <button className="text-link" onClick={() => navigate("hospitals")}>
                View all <Icon name="arrow" size={15} />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {hospitals.slice(0, 2).map((h) => (
                <div className="list-hospital" key={h.name}>
                  <img src={h.image} alt="" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <h3>{h.name}</h3>
                        <p>
                          <Icon name="location" size={14} /> {h.area} · {h.distance}
                        </p>
                      </div>
                      <span className="rating">
                        <Icon name="star" size={12} /> {h.rating}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="status available">
                        <span />
                        {h.beds} beds
                      </span>
                      <span className="status limited">
                        <span />
                        {h.icu} ICU beds
                      </span>
                      <span className="status available">
                        <span />
                        Oxygen
                      </span>
                      <button onClick={() => navigate("hospital")} className="btn btn-soft ml-auto">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <aside className="space-y-6">
            <div className="panel p-6">
              <h2 className="panel-title">Upcoming appointment</h2>
              <div className="mt-5 flex gap-3">
                <div className="date-tile">
                  <b>26</b>
                  <span>JUN</span>
                </div>
                <div>
                  <b className="text-sm">Dr. Ananya Mehta</b>
                  <p className="text-xs text-slate-500">Cardiologist · 10:30 AM</p>
                  <p className="mt-1 text-xs text-slate-400">AIIMS Bhopal</p>
                </div>
              </div>
              <button
                onClick={() => navigate("appointments")}
                className="btn btn-outline mt-5 w-full"
              >
                View appointment
              </button>
            </div>
            <div className="panel p-6">
              <h2 className="panel-title">Your health access</h2>
              <div className="mt-4 space-y-3">
                <DashboardLink
                  icon="calendar"
                  label="Book appointment"
                  onClick={() => navigate("booking")}
                />
                <DashboardLink
                  icon="ambulance"
                  label="Request ambulance"
                  onClick={() => navigate("transport")}
                />
                <DashboardLink icon="call" label="24×7 health helpline" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function DashboardLink({
  icon,
  label,
  onClick,
}: {
  icon: IconName;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl bg-slate-50 p-3 text-left text-sm font-semibold hover:bg-blue-50"
    >
      <span className="text-blue-600">
        <Icon name={icon} size={18} />
      </span>
      {label}
      <Icon name="chevron" size={14} className="ml-auto text-slate-300" />
    </button>
  );
}

function HospitalList({
  navigate,
  location,
  setLocation,
  notify,
}: {
  navigate: (p: Page) => void;
  location: UserLocation;
  setLocation: (value: UserLocation) => void;
  notify: (message: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [radius, setRadius] = useState(20);
  const [sort, setSort] = useState("Nearest First");
  const [view, setView] = useState<"map" | "list">("map");
  const [zoom, setZoom] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState([
    "ICU Bed Available",
    "General Bed Available",
    "Oxygen Available",
  ]);
  const runSearch = () => {
    setSearching(true);
    window.setTimeout(() => setSearching(false), 900);
  };
  const toggleFilter = (filter: string) =>
    setFilters((current) =>
      current.includes(filter) ? current.filter((x) => x !== filter) : [...current, filter],
    );
  const shown = useMemo(() => {
    if (!location.label.toLowerCase().includes("bhopal")) return [];
    const result = hospitals.filter((h) => {
      const matchesText =
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.area.toLowerCase().includes(search.toLowerCase());
      const matchesRadius = h.distanceValue <= radius;
      const matchesAmbulance = !filters.includes("Ambulance Available") || h.ambulance;
      return matchesText && matchesRadius && matchesAmbulance;
    });
    if (sort === "Highest Rated") return [...result].sort((a, b) => +b.rating - +a.rating);
    if (sort === "Highest Availability")
      return [...result].sort((a, b) => b.beds + b.icu - (a.beds + a.icu));
    return [...result].sort((a, b) => a.distanceValue - b.distanceValue);
  }, [search, radius, sort, filters, location.label]);
  const filterOptions = [
    "ICU Bed Available",
    "General Bed Available",
    "Oxygen Available",
    "Essential Medicines Available",
    "Specialist Doctors Available",
    "Ambulance Available",
    "Emergency Services Available",
  ];

  return (
    <div className="hospital-finder-page">
      <div className="finder-hero">
        <div className="site-container py-9">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="section-eyebrow">Smart hospital discovery</div>
              <h1 className="page-title mt-2">Healthcare near you, mapped.</h1>
              <p className="mt-2 text-sm text-slate-500">
                Discover hospitals around your location and compare reported resource availability.
              </p>
            </div>
            <div className="sample-data-note">
              <Icon name="help" size={15} />
              Sample availability data for product demonstration
            </div>
          </div>
          <div className="mt-7">
            <LocationSearch location={location} setLocation={setLocation} onSearch={runSearch} />
          </div>
        </div>
      </div>

      <div className="site-container py-7">
        <div className="finder-toolbar">
          <div className="finder-query">
            <Icon name="search" size={18} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hospital name or area in Bhopal"
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                <Icon name="close" size={15} />
              </button>
            )}
          </div>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`btn btn-outline lg:hidden ${filters.length ? "filter-active" : ""}`}
          >
            <Icon name="settings" size={16} /> Filters ({filters.length})
          </button>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="sort-select">
            <option>Nearest First</option>
            <option>Highest Availability</option>
            <option>Highest Rated</option>
          </select>
          <div className="view-toggle">
            <button onClick={() => setView("map")} className={view === "map" ? "active" : ""}>
              <Icon name="map" size={16} /> Map
            </button>
            <button onClick={() => setView("list")} className={view === "list" ? "active" : ""}>
              <Icon name="menu" size={16} /> List
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[235px_1fr]">
          <aside className={`filter-sidebar ${filtersOpen ? "open" : ""}`}>
            <div className="flex items-center justify-between">
              <h2 className="panel-title">Smart filters</h2>
              <button onClick={() => setFilters([])} className="text-link">
                Clear all
              </button>
            </div>
            <div className="mt-5 space-y-1">
              {filterOptions.map((filter) => (
                <label className="filter-check" key={filter}>
                  <input
                    type="checkbox"
                    checked={filters.includes(filter)}
                    onChange={() => toggleFilter(filter)}
                  />
                  <span className="custom-check">
                    <Icon name="check" size={12} />
                  </span>
                  {filter}
                </label>
              ))}
            </div>
            <div className="mt-6 border-t border-slate-100 pt-5">
              <div className="flex justify-between">
                <h3 className="text-xs font-bold">Search radius</h3>
                <b className="text-xs text-blue-600">{radius} km</b>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[2, 5, 10, 20].map((value) => (
                  <button
                    onClick={() => setRadius(value)}
                    className={`radius-option ${radius === value ? "active" : ""}`}
                    key={value}
                  >
                    {value} km
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-tip">
              <Icon name="shield" size={17} />
              <p>
                <b>Before you travel</b>
                <span>Call the hospital to confirm current availability.</span>
              </p>
            </div>
          </aside>

          <div className="min-w-0">
            {view === "map" && (
              <DiscoveryMap
                hospitals={shown}
                location={location}
                zoom={zoom}
                setZoom={setZoom}
                radius={radius}
                setRadius={setRadius}
                onLocate={() => setLocation({ ...location, status: "permission" })}
                onHospital={() => navigate("hospital")}
              />
            )}

            <div
              className={`${view === "map" ? "mt-7" : ""} flex flex-wrap items-center justify-between gap-3`}
            >
              <div>
                <h2 className="text-lg font-extrabold">
                  {shown.length} hospitals found near {location.label.split(",")[0]}
                </h2>
                <p className="mt-1 text-[11px] text-slate-400">
                  Distances are estimated from your selected location
                </p>
              </div>
              <span className="updated-pill">
                <span className="live-dot" /> Results updated just now
              </span>
            </div>

            {searching ? (
              <div className="hospital-skeletons">
                {[1, 2, 3].map((x) => (
                  <div className="hospital-skeleton" key={x}>
                    <span />
                    <div>
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                ))}
              </div>
            ) : shown.length ? (
              <div className={`mt-5 grid gap-5 ${view === "list" ? "xl:grid-cols-2" : ""}`}>
                {shown.map((hospital) => (
                  <DiscoveryHospitalCard
                    hospital={hospital}
                    navigate={navigate}
                    notify={notify}
                    key={hospital.name}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="icon-tile blue large">
                  <Icon name="map" />
                </span>
                <h3>No hospitals found within {radius} km</h3>
                <p>Expand your search radius, change the location, or remove some filters.</p>
                <div className="flex justify-center gap-2">
                  <button onClick={() => setRadius(20)} className="btn btn-primary">
                    Expand to 20 km
                  </button>
                  <button onClick={() => setFilters([])} className="btn btn-outline">
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <button onClick={() => navigate("emergency")} className="fixed-sos">
        <span>
          <Icon name="activity" size={21} />
        </span>
        <b>Emergency SOS</b>
        <small>Help near {location.label.split(",")[0]}</small>
      </button>
    </div>
  );
}

function DiscoveryMap({
  hospitals: mapHospitals,
  location,
  zoom,
  setZoom,
  radius,
  setRadius,
  onLocate,
  onHospital,
}: {
  hospitals: typeof hospitals;
  location: UserLocation;
  zoom: number;
  setZoom: (value: number) => void;
  radius: number;
  setRadius: (value: number) => void;
  onLocate: () => void;
  onHospital: () => void;
}) {
  return (
    <div className="discovery-map">
      <div className="map-road road-one" />
      <div className="map-road road-two" />
      <div className="map-road road-three" />
      <div className="map-lake" />
      <span className="map-area area-one">ARERA COLONY</span>
      <span className="map-area area-two">SHAHPURA</span>
      <span className="map-area area-three">SAKET NAGAR</span>
      <div className="user-map-marker" title={`Your location: ${location.label}`}>
        <span />
        <i />
      </div>
      {mapHospitals.map((hospital, index) => (
        <button
          onClick={onHospital}
          className="hospital-map-marker"
          style={{ ...hospital.marker, transform: `scale(${zoom})` }}
          key={hospital.name}
        >
          <span>
            <Icon name="hospital" size={15} />
          </span>
          <b>{index + 1}</b>
          <label>
            {hospital.name}
            <small>{hospital.distance}</small>
          </label>
        </button>
      ))}
      <div className="map-radius-control">
        <span>Nearby radius</span>
        {[2, 5, 10, 20].map((value) => (
          <button
            onClick={() => setRadius(value)}
            className={radius === value ? "active" : ""}
            key={value}
          >
            {value} km
          </button>
        ))}
      </div>
      <div className="map-controls">
        <button onClick={() => setZoom(Math.min(1.3, zoom + 0.1))} aria-label="Zoom in">
          <Icon name="plus" size={18} />
        </button>
        <button onClick={() => setZoom(Math.max(0.8, zoom - 0.1))} aria-label="Zoom out">
          <span className="text-xl leading-none">−</span>
        </button>
        <button onClick={onLocate} aria-label="Use current location">
          <Icon name="location" size={17} />
        </button>
      </div>
      <div className="map-legend">
        <span>
          <i className="user-dot" /> Your location
        </span>
        <span>
          <i className="hospital-dot" /> Hospital
        </span>
        <small>Zoom {Math.round(zoom * 100)}%</small>
      </div>
    </div>
  );
}

function DiscoveryHospitalCard({
  hospital,
  navigate,
  notify,
}: {
  hospital: (typeof hospitals)[number];
  navigate: (page: Page) => void;
  notify: (message: string) => void;
}) {
  return (
    <article className="discovery-hospital-card">
      <div className="hospital-card-image">
        <img src={hospital.image} alt={hospital.name} />
        <span className="distance-badge">
          <Icon name="location" size={13} /> {hospital.distance}
        </span>
        <span className="sample-badge">Sample data</span>
      </div>
      <div className="hospital-card-body">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[.1em] text-blue-600">
              {hospital.type}
            </span>
            <h3>{hospital.name}</h3>
            <p>
              <Icon name="location" size={13} /> {hospital.address}
            </p>
          </div>
          <span className="rating">
            <Icon name="star" size={13} className="fill-amber-400 text-amber-400" />
            {hospital.rating} <small>({hospital.reviews})</small>
          </span>
        </div>
        <div className="hospital-resource-grid">
          <div>
            <Icon name="activity" />
            <span>
              <small>ICU beds</small>
              <b>{hospital.icu} available</b>
            </span>
          </div>
          <div>
            <Icon name="bed" />
            <span>
              <small>General beds</small>
              <b>{hospital.beds} available</b>
            </span>
          </div>
          <div>
            <Icon name="oxygen" />
            <span>
              <small>Oxygen</small>
              <b>Available</b>
            </span>
          </div>
          <div>
            <Icon name="doctor" />
            <span>
              <small>Doctors</small>
              <b>{hospital.doctors} on duty</b>
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="status available">
            <span /> Emergency open
          </span>
          <span className={`status ${hospital.ambulance ? "available" : "limited"}`}>
            <span /> Ambulance {hospital.ambulance ? "ready" : "on call"}
          </span>
          <span className="status available">
            <span /> Medicines
          </span>
        </div>
        <div className="hospital-card-actions">
          <button onClick={() => notify(`Calling ${hospital.name}…`)} className="btn btn-primary">
            <Icon name="call" size={15} /> Call
          </button>
          <button onClick={() => navigate("hospital")} className="btn btn-soft">
            View details
          </button>
          <button
            onClick={() => notify(`Opening directions to ${hospital.name}…`)}
            className="btn btn-outline"
          >
            <Icon name="map" size={15} /> Directions
          </button>
        </div>
      </div>
    </article>
  );
}

function HospitalDetails({
  navigate,
  notify,
}: {
  navigate: (p: Page) => void;
  notify: (m: string) => void;
}) {
  const [tab, setTab] = useState("Overview");
  return (
    <div className="pb-20">
      <div className="bg-[#eef6ff]">
        <div className="site-container py-8">
          <button
            onClick={() => navigate("hospitals")}
            className="mb-5 flex items-center gap-2 text-xs font-semibold text-slate-500"
          >
            <span className="rotate-180">
              <Icon name="arrow" size={15} />
            </span>{" "}
            Back to hospitals
          </button>
          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div className="flex flex-col gap-5 sm:flex-row">
              <img
                className="h-36 w-full rounded-2xl object-cover sm:w-52"
                src="/hospital-hero.png"
                alt="AIIMS Bhopal"
              />
              <div>
                <span className="badge blue-badge">Government Super Speciality</span>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight">AIIMS Bhopal</h1>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <Icon name="location" size={16} /> Saket Nagar, Bhopal · 2.1 km away
                </p>
                <div className="mt-3 flex items-center gap-4 text-sm">
                  <span className="rating">
                    <Icon name="star" size={13} /> 4.7
                  </span>
                  <span className="text-slate-500">3,612 reviews</span>
                  <span className="status available">
                    <span /> Open 24×7
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <button
                onClick={() => notify("Connecting your call to AIIMS Bhopal…")}
                className="btn btn-primary w-full"
              >
                <Icon name="call" size={17} /> Call hospital
              </button>
              <button onClick={() => navigate("booking")} className="btn btn-outline w-full">
                <Icon name="calendar" size={17} /> Book appointment
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-[76px] z-20 border-b bg-white">
        <div className="site-container flex gap-7 overflow-auto">
          {["Overview", "Resources", "Doctors", "Location & contact"].map((x) => (
            <button
              onClick={() => setTab(x)}
              className={`tab ${tab === x ? "active" : ""}`}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
      </div>
      <div className="site-container mt-8 grid gap-7 lg:grid-cols-[1fr_330px]">
        <div>
          <section>
            <div className="flex items-center justify-between">
              <h2 className="panel-title text-lg">Live resource availability</h2>
              <span className="text-xs text-slate-400">Updated 8 min ago</span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {resources.map((r) => (
                <div className="resource-card" key={r.label}>
                  <span className={`icon-tile ${r.tone}`}>
                    <Icon name={r.icon} />
                  </span>
                  <div>
                    <p>{r.label}</p>
                    <b>{r.value}</b>
                    <small className={r.tone === "amber" ? "text-amber-600" : "text-teal-600"}>
                      {r.note}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="mt-9">
            <div className="flex items-center justify-between">
              <h2 className="panel-title text-lg">Doctors available today</h2>
              <button className="text-link">View all doctors</button>
            </div>
            <div className="mt-4 space-y-3">
              {doctors.map((d) => (
                <div className="doctor-row" key={d.name}>
                  <span className={`avatar-lg ${d.color}`}>{d.initials}</span>
                  <div className="flex-1">
                    <h3>{d.name}</h3>
                    <p>
                      {d.role} · {d.exp}
                    </p>
                    <small>
                      <Icon name="clock" size={13} /> {d.time}
                    </small>
                  </div>
                  <span className="status available">
                    <span /> Available
                  </span>
                  <button onClick={() => navigate("booking")} className="btn btn-soft">
                    Book
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <div className="panel overflow-hidden">
            <div className="map-placeholder">
              <div className="map-lines" />
              <span className="map-pin">
                <Icon name="hospital" size={20} />
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-bold">Location & directions</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Saket Nagar, Habibganj, Bhopal, Madhya Pradesh 462020
              </p>
              <button
                onClick={() => notify("Directions opened in your maps app.")}
                className="btn btn-outline mt-4 w-full"
              >
                <Icon name="map" size={17} /> Get directions
              </button>
            </div>
          </div>
          <div className="panel p-5">
            <h3 className="font-bold">Hospital contact</h3>
            <p className="mt-4 flex items-center gap-3 text-sm">
              <span className="icon-tile blue">
                <Icon name="call" size={17} />
              </span>
              <span>
                <small className="block text-slate-400">Emergency</small>+91 755 267 2333
              </span>
            </p>
            <p className="mt-3 flex items-center gap-3 text-sm">
              <span className="icon-tile teal">
                <Icon name="mail" size={17} />
              </span>
              <span>
                <small className="block text-slate-400">Email</small>care@aiimsbhopal.example
              </span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Booking({ navigate }: { navigate: (p: Page) => void }) {
  const [step, setStep] = useState(1);
  const [doctor, setDoctor] = useState(0);
  const [date, setDate] = useState(2);
  const [time, setTime] = useState("10:30 AM");
  if (step === 4)
    return (
      <div className="page-wrap">
        <div className="site-container max-w-xl">
          <div className="panel p-8 text-center sm:p-12">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 text-teal-600">
              <Icon name="check" size={38} />
            </span>
            <h1 className="mt-6 text-3xl font-extrabold">Appointment confirmed</h1>
            <p className="mt-3 text-slate-500">
              Your visit with {doctors[doctor].name} has been booked successfully.
            </p>
            <div className="mt-7 rounded-2xl bg-slate-50 p-5 text-left">
              <div className="flex justify-between border-b border-slate-200 pb-4">
                <span className="text-sm text-slate-500">Appointment ID</span>
                <b className="text-blue-700">SC-AP28416</b>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
                <div>
                  <small className="text-slate-400">Date</small>
                  <b className="block">26 June 2025</b>
                </div>
                <div>
                  <small className="text-slate-400">Time</small>
                  <b className="block">{time}</b>
                </div>
                <div className="col-span-2">
                  <small className="text-slate-400">Hospital</small>
                  <b className="block">AIIMS Bhopal</b>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("appointments")}
              className="btn btn-primary mt-7 w-full"
            >
              View my appointments
            </button>
            <button onClick={() => navigate("dashboard")} className="btn btn-ghost mt-2 w-full">
              Back to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  return (
    <div className="page-wrap">
      <div className="site-container max-w-5xl">
        <div className="text-center">
          <div className="section-eyebrow">Appointment booking</div>
          <h1 className="page-title mt-2">Book your consultation</h1>
          <p className="mt-2 text-slate-500">
            Select a doctor, choose a convenient time, and confirm your details.
          </p>
        </div>
        <div className="stepper">
          {["Choose doctor", "Date & time", "Patient details"].map((x, i) => (
            <div className={`stepper-item ${step >= i + 1 ? "active" : ""}`} key={x}>
              <span>{step > i + 1 ? <Icon name="check" size={15} /> : i + 1}</span>
              <b>{x}</b>
            </div>
          ))}
        </div>
        <div className="panel mt-8 p-5 sm:p-8">
          {step === 1 && (
            <>
              <h2 className="panel-title text-lg">Select a doctor</h2>
              <p className="mt-1 text-sm text-slate-500">AIIMS Bhopal · Saket Nagar, Bhopal</p>
              <div className="mt-6 grid gap-4">
                {doctors.map((d, i) => (
                  <button
                    onClick={() => setDoctor(i)}
                    className={`select-row ${doctor === i ? "selected" : ""}`}
                    key={d.name}
                  >
                    <span className={`avatar-lg ${d.color}`}>{d.initials}</span>
                    <span className="flex-1 text-left">
                      <b>{d.name}</b>
                      <small>
                        {d.role} · {d.exp}
                      </small>
                    </span>
                    <span className="hidden text-right sm:block">
                      <small>Consultation fee</small>
                      <b>₹{i === 0 ? "1,200" : "900"}</b>
                    </span>
                    <span className="radio">
                      <span />
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="panel-title text-lg">Choose date and time</h2>
              <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-7">
                {["Mon|24", "Tue|25", "Wed|26", "Thu|27", "Fri|28", "Sat|29", "Sun|30"].map(
                  (x, i) => {
                    const [a, b] = x.split("|");
                    return (
                      <button
                        onClick={() => setDate(i)}
                        className={`date-option ${date === i ? "selected" : ""}`}
                        key={x}
                      >
                        <small>{a}</small>
                        <b>{b}</b>
                        <span>Jun</span>
                      </button>
                    );
                  },
                )}
              </div>
              <h3 className="mt-8 text-sm font-bold">Available time slots</h3>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  "09:00 AM",
                  "09:30 AM",
                  "10:00 AM",
                  "10:30 AM",
                  "11:30 AM",
                  "12:00 PM",
                  "03:00 PM",
                  "04:30 PM",
                ].map((x) => (
                  <button
                    onClick={() => setTime(x)}
                    className={`time-option ${time === x ? "selected" : ""}`}
                    key={x}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="panel-title text-lg">Patient details</h2>
              <p className="mt-1 text-sm text-slate-500">
                Please confirm who this appointment is for.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Patient name" value="Aarav Sharma" />
                <Field label="Mobile number" value="+91 98765 43210" />
                <Field label="Age" value="29" />
                <Field label="Gender" value="Male" />
                <label className="sm:col-span-2">
                  <span className="field-label">Reason for visit</span>
                  <textarea
                    className="input min-h-24"
                    placeholder="Briefly describe symptoms or concern"
                  />
                </label>
              </div>
              <div className="mt-6 flex gap-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
                <Icon name="shield" className="shrink-0 text-blue-600" />
                <p>
                  Your personal and health information is encrypted and shared only with the
                  selected care provider.
                </p>
              </div>
            </>
          )}
          <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
            <button
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className="btn btn-ghost disabled:opacity-0"
            >
              Back
            </button>
            <button onClick={() => setStep(step + 1)} className="btn btn-primary">
              {step === 3 ? "Confirm appointment" : "Continue"} <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value = "",
  type = "text",
}: {
  label: string;
  value?: string;
  type?: string;
}) {
  return (
    <label>
      <span className="field-label">{label}</span>
      <input className="input" type={type} defaultValue={value} />
    </label>
  );
}

function Emergency({
  navigate,
  notify,
  location,
}: {
  navigate: (p: Page) => void;
  notify: (m: string) => void;
  location: UserLocation;
}) {
  const [active, setActive] = useState(false);
  return (
    <div className="emergency-page">
      <div className="site-container py-10 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="emergency-eyebrow">
            <span className="live-dot red" /> Emergency assistance · 24×7
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {active ? "Help is being arranged" : "Emergency help, right now."}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-red-100">
            {active
              ? "We have shared your current location with our response network. Stay on this screen."
              : "Tap the SOS button to share your location and alert nearby emergency hospitals and ambulance services."}
          </p>
          <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold">
            <Icon name="location" size={15} /> Current location: {location.label}
          </div>
          <button
            onClick={() => setActive(true)}
            className={`sos-button ${active ? "active" : ""}`}
          >
            <span className="sos-ring" />
            <Icon name={active ? "check" : "activity"} size={42} />
            <strong>{active ? "REQUEST SENT" : "SOS"}</strong>
            <small>{active ? "Response team notified" : "Press for 2 seconds"}</small>
          </button>
          {active && (
            <div className="request-status">
              <span className="pulse-dot" />
              <div className="text-left">
                <b>Ambulance assigned · MP 04 AB 2841</b>
                <small>Estimated arrival in 8–10 minutes</small>
              </div>
              <button
                onClick={() => notify("Calling the ambulance driver…")}
                className="btn bg-white text-red-600"
              >
                <Icon name="call" size={17} /> Call driver
              </button>
            </div>
          )}
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <button
            onClick={() => notify("Your live location has been shared.")}
            className="emergency-action"
          >
            <Icon name="location" />
            <span>
              <b>Share location</b>
              <small>Send live coordinates</small>
            </span>
          </button>
          <button
            onClick={() => notify("Calling national emergency helpline 112…")}
            className="emergency-action"
          >
            <Icon name="call" />
            <span>
              <b>Call 112</b>
              <small>National emergency line</small>
            </span>
          </button>
          <button onClick={() => navigate("transport")} className="emergency-action">
            <Icon name="ambulance" />
            <span>
              <b>Find ambulance</b>
              <small>Nearby transport</small>
            </span>
          </button>
        </div>
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Nearby emergency hospitals</h2>
            <span className="text-xs text-red-100">Sample availability</span>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {hospitals.map((h) => (
              <div className="emergency-hospital" key={h.name}>
                <div className="flex justify-between gap-3">
                  <div>
                    <h3>{h.name}</h3>
                    <p>{h.distance} · Emergency open</p>
                  </div>
                  <span className="status-white">
                    <span /> Available
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => notify(`Calling ${h.name}…`)}
                    className="btn bg-white text-red-600"
                  >
                    <Icon name="call" size={16} /> Call
                  </button>
                  <button
                    onClick={() => navigate("hospital")}
                    className="btn border border-white/20 text-white"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Transport({ notify }: { notify: (m: string) => void }) {
  const rides = [
    [
      "ambulance",
      "Swasthya Emergency Ambulance",
      "Advanced life support",
      "6 min",
      "₹1,200",
      "blue",
    ],
    ["ambulance", "CityCare Patient Transport", "Basic life support", "12 min", "₹850", "teal"],
    ["map", "Uber Health Ride", "Non-emergency transport", "4 min", "₹284", "slate"],
    ["location", "Rapido Auto", "For routine hospital visits", "3 min", "₹126", "amber"],
  ];
  return (
    <div className="page-wrap">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-[1fr_.72fr]">
          <div>
            <div className="section-eyebrow">Transport & ambulance</div>
            <h1 className="page-title mt-2">Get to care, safely and quickly.</h1>
            <p className="mt-2 max-w-xl text-slate-500">
              Request an equipped ambulance for emergencies or compare transport options for routine
              visits.
            </p>
            <div className="mt-8 space-y-4">
              {rides.map(([icon, name, desc, eta, price, tone]) => (
                <div className="transport-row" key={name}>
                  <span className={`icon-tile ${tone} large`}>
                    <Icon name={icon as IconName} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3>{name}</h3>
                    <p>{desc}</p>
                    <div className="mt-2 flex gap-4 text-xs font-semibold">
                      <span>
                        <Icon name="clock" size={13} /> {eta}
                      </span>
                      <span>
                        <Icon name="location" size={13} /> 2.4 km away
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <b>{price}</b>
                    <small>estimated</small>
                    <button
                      onClick={() => notify(`${name} requested. Confirming availability…`)}
                      className={`btn mt-2 ${tone === "blue" ? "btn-primary" : "btn-outline"}`}
                    >
                      Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside>
            <div className="panel sticky top-28 overflow-hidden">
              <div className="transport-map">
                <div className="map-lines" />
                <span className="route start">
                  <Icon name="location" size={17} />
                </span>
                <span className="route end">
                  <Icon name="hospital" size={17} />
                </span>
                <div className="route-line" />
              </div>
              <div className="p-6">
                <h2 className="panel-title">Your route</h2>
                <div className="mt-5 space-y-4">
                  <div className="route-point">
                    <span className="dot blue" />
                    <div>
                      <small>Pickup location</small>
                      <b>Current location, Bhopal</b>
                    </div>
                  </div>
                  <div className="route-point">
                    <span className="dot teal" />
                    <div>
                      <small>Destination</small>
                      <b>AIIMS Bhopal</b>
                    </div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 rounded-xl bg-slate-50 p-4 text-center">
                  <div>
                    <b>1.8 km</b>
                    <small>Distance</small>
                  </div>
                  <div>
                    <b>8 min</b>
                    <small>ETA</small>
                  </div>
                  <div>
                    <b>Clear</b>
                    <small>Traffic</small>
                  </div>
                </div>
                <button
                  onClick={() => notify("Route opened in Google Maps.")}
                  className="btn btn-outline mt-4 w-full"
                >
                  <Icon name="map" size={16} /> Open in Google Maps
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function AuthSelection({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <div className="auth-selection-page">
      <div className="auth-selection-glow one" />
      <div className="auth-selection-glow two" />
      <div className="site-container relative z-10 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex w-fit items-center justify-center">
            <Logo onClick={() => navigate("home")} />
          </div>
          <div className="section-eyebrow mt-10">Secure access</div>
          <h1 className="page-title mt-3">Choose how you’d like to continue</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">
            Select your account type to access the right CurePlus experience.
          </p>
        </div>
        <div className="auth-role-grid">
          <article className="auth-role-card patient">
            <div className="role-card-top">
              <span className="role-icon patient">
                <Icon name="user" size={34} />
              </span>
              <span className="role-label">For patients & families</span>
            </div>
            <h2>Patient Login</h2>
            <p>
              Access nearby hospitals, check bed availability, find doctors and book appointments.
            </p>
            <div className="role-feature-list">
              {["Find nearby care", "Manage appointments", "Emergency assistance"].map((item) => (
                <span key={item}>
                  <Icon name="check" size={14} /> {item}
                </span>
              ))}
            </div>
            <button onClick={() => navigate("patient-login")} className="btn btn-primary w-full">
              Login as Patient <Icon name="arrow" size={16} />
            </button>
            <button onClick={() => navigate("signup")} className="role-secondary">
              New here? <b>Create Patient Account</b>
            </button>
          </article>
          <article className="auth-role-card hospital">
            <div className="role-card-top">
              <span className="role-icon hospital">
                <Icon name="hospital" size={34} />
              </span>
              <span className="role-label">For healthcare providers</span>
            </div>
            <h2>Hospital Admin Login</h2>
            <p>Manage hospital resources, doctors, patient appointments and emergency requests.</p>
            <div className="role-feature-list">
              {["Update resource status", "Coordinate care teams", "Manage patient requests"].map(
                (item) => (
                  <span key={item}>
                    <Icon name="check" size={14} /> {item}
                  </span>
                ),
              )}
            </div>
            <button onClick={() => navigate("admin-login")} className="btn btn-teal w-full">
              Login as Hospital Admin <Icon name="arrow" size={16} />
            </button>
            <button onClick={() => navigate("register-hospital")} className="role-secondary">
              New hospital? <b>Register Your Hospital</b>
            </button>
          </article>
        </div>
        <div className="auth-trust-row">
          <span>
            <Icon name="shield" size={16} /> Secure encrypted access
          </span>
          <span>
            <Icon name="help" size={16} /> Need help signing in?
          </span>
        </div>
      </div>
    </div>
  );
}

function PasswordField({
  label,
  placeholder = "Enter your password",
}: {
  label: string;
  placeholder?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <label>
      <span className="field-label">{label}</span>
      <div className="password-input">
        <Icon name="shield" size={16} />
        <input type={visible ? "text" : "password"} placeholder={placeholder} required />
        <button type="button" onClick={() => setVisible(!visible)}>
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </label>
  );
}

function AuthForm({
  mode,
  navigate,
}: {
  mode: "patient-login" | "signup" | "admin-login";
  navigate: (page: Page) => void;
}) {
  const admin = mode === "admin-login";
  const signup = mode === "signup";
  const submit = (event: FormEvent) => {
    event.preventDefault();
    navigate(admin ? "admin" : "dashboard");
  };
  return (
    <div className={`auth-experience ${admin ? "admin-auth" : "patient-auth"}`}>
      <div className="auth-story">
        <div className="relative z-10 flex h-full max-w-lg flex-col">
          <Logo inverse onClick={() => navigate("home")} />
          <div className="my-auto py-14">
            <span className="auth-story-icon">
              <Icon name={admin ? "hospital" : signup ? "heart" : "user"} size={28} />
            </span>
            <h2>
              {admin
                ? "Hospital operations, connected."
                : signup
                  ? "Your care journey begins here."
                  : "Care is closer than you think."}
            </h2>
            <p>
              {admin
                ? "Keep resources current, coordinate your teams, and respond to patients from one secure workspace."
                : "Discover nearby hospitals, understand available resources, and manage your appointments with confidence."}
            </p>
            <div className="auth-story-points">
              <span>
                <Icon name="shield" size={16} /> Privacy-first access
              </span>
              <span>
                <Icon name="activity" size={16} /> Built for critical moments
              </span>
            </div>
          </div>
          <small>Protected by CurePlus secure authentication</small>
        </div>
      </div>
      <div className="auth-form premium">
        <div className="w-full max-w-[440px]">
          <button onClick={() => navigate("login")} className="auth-back">
            <span className="rotate-180">
              <Icon name="arrow" size={15} />
            </span>
            Back to login options
          </button>
          <div className="lg:hidden">
            <Logo onClick={() => navigate("home")} />
          </div>
          <div className="mt-9 lg:mt-12">
            <span className={`section-eyebrow ${admin ? "teal-text" : ""}`}>
              {admin
                ? "Secure hospital workspace"
                : signup
                  ? "Patient registration"
                  : "Patient access"}
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
              {admin
                ? "Hospital Administrator Portal"
                : signup
                  ? "Create your patient account"
                  : "Welcome back"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {admin
                ? "Sign in with your registered hospital credentials."
                : signup
                  ? "Set up your secure account in less than a minute."
                  : "Sign in to continue to your health dashboard."}
            </p>
          </div>
          <form onSubmit={submit} className="mt-7 space-y-4">
            {signup && (
              <div className="auth-field">
                <label className="field-label">Full Name</label>
                <div className="auth-input">
                  <Icon name="user" size={16} />
                  <input placeholder="Enter your full name" required />
                </div>
              </div>
            )}
            <div className="auth-field">
              <label className="field-label">
                {admin ? "Registered Hospital Email or Hospital ID" : "Email Address"}
              </label>
              <div className="auth-input">
                <Icon name={admin ? "hospital" : "mail"} size={16} />
                <input
                  type={admin ? "text" : "email"}
                  placeholder={admin ? "hospital@example.com or HSP-0000" : "you@example.com"}
                  required
                />
              </div>
            </div>
            {signup && (
              <div className="auth-field">
                <label className="field-label">Mobile Number</label>
                <div className="auth-input">
                  <Icon name="call" size={16} />
                  <input type="tel" placeholder="+91 98765 43210" required />
                </div>
              </div>
            )}
            <PasswordField label="Password" />
            {signup && (
              <PasswordField label="Confirm Password" placeholder="Re-enter your password" />
            )}
            {!signup && (
              <div className="flex items-center justify-between text-[11px]">
                <label className="auth-checkbox">
                  <input type="checkbox" defaultChecked />
                  <span>
                    <Icon name="check" size={11} />
                  </span>
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => navigate(admin ? "admin-forgot" : "forgot-password")}
                  className="font-bold text-blue-600"
                >
                  Forgot Password?
                </button>
              </div>
            )}
            <button className={`btn ${admin ? "btn-teal" : "btn-primary"} mt-2 w-full`}>
              <Icon name={admin ? "shield" : signup ? "plus" : "user"} size={16} />
              {admin ? "Secure Login" : signup ? "Create Account" : "Login"}
            </button>
          </form>
          {!admin && !signup && (
            <>
              <div className="auth-divider">
                <span>or continue with</span>
              </div>
              <button onClick={() => navigate("dashboard")} className="google-button">
                <span>G</span> Continue with Google
              </button>
            </>
          )}
          <p className="mt-6 text-center text-xs text-slate-500">
            {admin
              ? "New Hospital?"
              : signup
                ? "Already have an account?"
                : "Don’t have an account?"}{" "}
            <button
              onClick={() =>
                navigate(admin ? "register-hospital" : signup ? "patient-login" : "signup")
              }
              className="font-extrabold text-blue-600"
            >
              {admin ? "Register Your Hospital" : signup ? "Login" : "Sign Up"}
            </button>
          </p>
          <div className="auth-security-note">
            <Icon name="shield" size={14} />
            Your credentials are encrypted and securely transmitted.
          </div>
        </div>
      </div>
    </div>
  );
}

function ForgotPassword({ admin, navigate }: { admin: boolean; navigate: (page: Page) => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="recovery-page">
      <div className="recovery-decoration one" />
      <div className="recovery-decoration two" />
      <div className="recovery-card">
        <Logo onClick={() => navigate("home")} />
        {sent ? (
          <div className="mt-10 text-center">
            <span className="recovery-success">
              <Icon name="mail" size={30} />
            </span>
            <div className="badge green-badge mt-5">Reset link sent</div>
            <h1 className="mt-3 text-2xl font-extrabold">Check your inbox</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              We sent password reset instructions to your registered{" "}
              {admin ? "hospital administrator email" : "email address"}. The link expires in 15
              minutes.
            </p>
            <button
              onClick={() => navigate(admin ? "admin-login" : "patient-login")}
              className={`btn ${admin ? "btn-teal" : "btn-primary"} mt-7 w-full`}
            >
              Back to {admin ? "Admin" : "Patient"} Login
            </button>
            <button onClick={() => setSent(false)} className="btn btn-ghost mt-2 w-full">
              Didn’t receive it? Try again
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate(admin ? "admin-login" : "patient-login")}
              className="auth-back mt-9"
            >
              <span className="rotate-180">
                <Icon name="arrow" size={15} />
              </span>
              Back to login
            </button>
            <span className={`recovery-icon ${admin ? "admin" : ""}`}>
              <Icon name={admin ? "hospital" : "shield"} size={24} />
            </span>
            <div className={`section-eyebrow mt-6 ${admin ? "teal-text" : ""}`}>
              {admin ? "Hospital account recovery" : "Patient account recovery"}
            </div>
            <h1 className="mt-3 text-3xl font-extrabold">Forgot your password?</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your {admin ? "registered hospital email or Hospital ID" : "email address"} and
              we’ll send secure reset instructions.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
              className="mt-7"
            >
              <label className="field-label">
                {admin ? "Registered Email or Hospital ID" : "Email Address"}
              </label>
              <div className="auth-input">
                <Icon name={admin ? "hospital" : "mail"} size={16} />
                <input
                  type={admin ? "text" : "email"}
                  placeholder={admin ? "hospital@example.com or HSP-0000" : "you@example.com"}
                  required
                />
              </div>
              <button className={`btn ${admin ? "btn-teal" : "btn-primary"} mt-5 w-full`}>
                Send Reset Link <Icon name="arrow" size={16} />
              </button>
            </form>
            <p className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <Icon name="shield" size={13} /> Secure password recovery
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Appointments({ navigate }: { navigate: (p: Page) => void }) {
  const [tab, setTab] = useState("Upcoming");
  return (
    <div className="page-wrap">
      <div className="site-container max-w-5xl">
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <div className="section-eyebrow">Your care</div>
            <h1 className="page-title mt-2">My appointments</h1>
          </div>
          <button onClick={() => navigate("booking")} className="btn btn-primary">
            <Icon name="plus" size={17} /> Book appointment
          </button>
        </div>
        <div className="mt-8 border-b border-slate-200">
          {["Upcoming", "Previous", "Cancelled"].map((x) => (
            <button
              onClick={() => setTab(x)}
              className={`tab ${tab === x ? "active" : ""}`}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
        {tab === "Upcoming" ? (
          <div className="mt-6 space-y-4">
            <AppointmentCard navigate={navigate} date="26" status="Confirmed" doctor={doctors[0]} />
            <AppointmentCard navigate={navigate} date="04" status="Pending" doctor={doctors[2]} />
          </div>
        ) : (
          <div className="empty-state">
            <span className="icon-tile blue large">
              <Icon name="calendar" />
            </span>
            <h3>No {tab.toLowerCase()} appointments</h3>
            <p>Your {tab.toLowerCase()} appointments will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AppointmentCard({
  date,
  status,
  doctor,
  navigate,
}: {
  date: string;
  status: string;
  doctor: (typeof doctors)[number];
  navigate: (p: Page) => void;
}) {
  return (
    <div className="panel p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="date-tile large">
          <span>JUN</span>
          <b>{date}</b>
          <small>2025</small>
        </div>
        <span className={`avatar-lg ${doctor.color}`}>{doctor.initials}</span>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold">{doctor.name}</h3>
            <span className={`badge ${status === "Confirmed" ? "green-badge" : "amber-badge"}`}>
              {status}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{doctor.role} · AIIMS Bhopal</p>
          <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Icon name="clock" size={14} /> 10:30 AM – 11:00 AM
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline">
            <Icon name="video" size={16} /> Join call
          </button>
          <button onClick={() => navigate("hospital")} className="btn btn-soft">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

function Profile({ notify }: { notify: (m: string) => void }) {
  return (
    <div className="page-wrap">
      <div className="site-container max-w-4xl">
        <div className="panel overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-blue-700 to-teal-500" />
          <div className="px-6 pb-8 sm:px-9">
            <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <span className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-xl font-bold text-blue-700">
                  AS
                </span>
                <div className="pb-1">
                  <h1 className="text-2xl font-extrabold">Aarav Sharma</h1>
                  <p className="text-sm text-slate-500">Patient ID #SC2841</p>
                </div>
              </div>
              <button className="btn btn-outline">
                <Icon name="edit" size={16} /> Edit profile
              </button>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Full name" value="Aarav Sharma" />
              <Field label="Date of birth" value="18 August 1996" />
              <Field label="Mobile number" value="+91 98765 43210" />
              <Field label="Email address" value="aarav@example.com" />
              <Field label="Blood group" value="O+" />
              <Field label="Emergency contact" value="+91 98765 12340" />
            </div>
            <button
              onClick={() => notify("Profile changes saved successfully.")}
              className="btn btn-primary mt-7"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HospitalRegistration({ navigate }: { navigate: (p: Page) => void }) {
  const [submitted, setSubmitted] = useState(false);
  if (submitted)
    return (
      <div className="registration-success-page">
        <div className="registration-success-card">
          <span className="verification-graphic">
            <Icon name="hospital" size={34} />
            <i>
              <Icon name="clock" size={16} />
            </i>
          </span>
          <div className="badge amber-badge mt-6">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" /> Pending Verification
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">Registration submitted</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            Thank you for registering your hospital. Our verification team will review the
            information and documents you provided.
          </p>
          <div className="verification-timeline">
            <div className="complete">
              <span>
                <Icon name="check" size={14} />
              </span>
              <p>
                <b>Application submitted</b>
                <small>Completed just now</small>
              </p>
            </div>
            <div className="active">
              <span>2</span>
              <p>
                <b>Document verification</b>
                <small>Usually completed in 2–3 business days</small>
              </p>
            </div>
            <div>
              <span>3</span>
              <p>
                <b>Workspace activation</b>
                <small>Secure admin access sent by email</small>
              </p>
            </div>
          </div>
          <div className="registration-reference">
            <span>
              <small>Application reference</small>
              <b>SC-HSP-2025-04821</b>
            </span>
            <button>Copy</button>
          </div>
          <button onClick={() => navigate("admin-login")} className="btn btn-teal mt-6 w-full">
            Return to Hospital Admin Login
          </button>
          <button onClick={() => navigate("home")} className="btn btn-ghost mt-2 w-full">
            Back to CurePlus
          </button>
        </div>
      </div>
    );
  return (
    <div className="hospital-registration-page">
      <div className="site-container max-w-4xl py-12 sm:py-16">
        <button onClick={() => navigate("login")} className="auth-back">
          <span className="rotate-180">
            <Icon name="arrow" size={15} />
          </span>
          Back to login options
        </button>
        <div className="mt-7 grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="registration-aside">
            <span className="role-icon hospital">
              <Icon name="hospital" size={31} />
            </span>
            <div className="section-eyebrow teal-text mt-6">Hospital onboarding</div>
            <h1 className="mt-3 text-2xl font-extrabold">Register your hospital</h1>
            <p className="mt-3 text-xs leading-6 text-slate-500">
              Join CurePlus to help patients discover your hospital and coordinate care
              requests.
            </p>
            <div className="registration-steps">
              <span className="active">
                <b>1</b> Hospital details
              </span>
              <span>
                <b>2</b> Verification review
              </span>
              <span>
                <b>3</b> Portal activation
              </span>
            </div>
            <div className="registration-help">
              <Icon name="help" size={17} />
              <p>
                <b>Need assistance?</b>
                <small>Call partner support at 1800-123-CARE</small>
              </p>
            </div>
          </aside>
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-extrabold">Hospital and administrator details</h2>
              <p className="mt-1 text-xs text-slate-500">
                All fields are required unless marked optional.
              </p>
            </div>
            <form
              className="registration-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="form-section">
                <div className="form-section-title">
                  <span>01</span>
                  <div>
                    <h3>Hospital information</h3>
                    <p>Official details as listed on your registration certificate.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field label="Hospital Name" />
                  <Field label="Hospital Registration ID" />
                  <Field label="Official Email" type="email" />
                  <Field label="Contact Number" type="tel" />
                  <label className="sm:col-span-2">
                    <span className="field-label">Hospital Address</span>
                    <textarea
                      className="input min-h-24"
                      placeholder="Street address and landmark"
                      required
                    />
                  </label>
                  <Field label="City" />
                  <Field label="State" />
                </div>
              </div>
              <div className="form-section">
                <div className="form-section-title">
                  <span>02</span>
                  <div>
                    <h3>Administrator account</h3>
                    <p>Create credentials for the hospital’s primary administrator.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field label="Administrator Name" />
                  <div />
                  <PasswordField label="Password" />
                  <PasswordField label="Confirm Password" placeholder="Re-enter your password" />
                </div>
              </div>
              <div className="form-section">
                <div className="form-section-title">
                  <span>03</span>
                  <div>
                    <h3>Verification documents</h3>
                    <p>Upload clear files in PDF, PNG, or JPG format.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <UploadField
                    icon="hospital"
                    title="Upload Hospital Logo"
                    detail="PNG or JPG · max 5 MB"
                    accept=".png,.jpg,.jpeg"
                  />
                  <UploadField
                    icon="shield"
                    title="Upload Registration Documents"
                    detail="PDF, PNG or JPG · max 10 MB"
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                </div>
              </div>
              <label className="registration-consent">
                <input type="checkbox" required />
                <span>
                  <Icon name="check" size={11} />
                </span>
                <p>
                  I confirm that the information provided is accurate and I am authorized to
                  register this hospital.
                </p>
              </label>
              <button className="btn btn-teal min-h-12 w-full">
                <Icon name="shield" size={17} /> Submit for Verification
              </button>
              <p className="mt-4 text-center text-[10px] text-slate-400">
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => navigate("admin-login")}
                  className="font-bold text-blue-600"
                >
                  Hospital Admin Login
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadField({
  icon,
  title,
  detail,
  accept,
}: {
  icon: IconName;
  title: string;
  detail: string;
  accept: string;
}) {
  const [file, setFile] = useState("");
  return (
    <label className={`upload-field ${file ? "has-file" : ""}`}>
      <input
        type="file"
        accept={accept}
        required
        onChange={(event) => setFile(event.target.files?.[0]?.name || "")}
      />
      <span className="icon-tile blue">
        <Icon name={file ? "check" : icon} size={18} />
      </span>
      <b>{file || title}</b>
      <small>{file ? "Ready to upload" : detail}</small>
      <em>{file ? "Change file" : "Browse file"}</em>
    </label>
  );
}

function InfoPage({
  type,
  notify,
}: {
  type: "about" | "contact" | "help";
  notify?: (m: string) => void;
}) {
  if (type === "about")
    return (
      <div className="page-wrap">
        <div className="site-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="section-eyebrow">Our mission</div>
            <h1 className="page-title mt-2">
              Making critical healthcare information accessible to everyone.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-500">
              CurePlus brings patients, hospitals, doctors, and emergency services together
              in one reliable network—so no one loses precious time searching for care.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              [
                "heart",
                "Patient first",
                "Every product decision begins with the needs of patients and caregivers.",
              ],
              [
                "shield",
                "Trust by design",
                "Resource data is verified, time-stamped, and protected with strong privacy standards.",
              ],
              [
                "activity",
                "Built for urgency",
                "Clear information and fewer steps make it easier to act in stressful moments.",
              ],
            ].map(([i, t, d]) => (
              <div className="step-card" key={t}>
                <span className="icon-tile blue large">
                  <Icon name={i as IconName} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  if (type === "contact")
    return (
      <div className="page-wrap">
        <div className="site-container max-w-4xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="section-eyebrow">Contact us</div>
              <h1 className="page-title mt-2">We’re here to help.</h1>
              <p className="mt-3 leading-7 text-slate-500">
                For product support, partnerships, or general questions, reach out to our care team.
              </p>
              <div className="mt-8 space-y-4">
                <DashboardLink icon="call" label="+91 11 4567 8900" />
                <DashboardLink icon="mail" label="help@CurePlus.example" />
                <DashboardLink icon="location" label="New Delhi, India" />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                notify?.("Your message has been sent. We’ll respond shortly.");
              }}
              className="panel space-y-5 p-7"
            >
              <Field label="Your name" />
              <Field label="Email address" />
              <label>
                <span className="field-label">How can we help?</span>
                <textarea className="input min-h-28" />
              </label>
              <button className="btn btn-primary w-full">Send message</button>
            </form>
          </div>
        </div>
      </div>
    );
  return (
    <div className="page-wrap">
      <div className="site-container max-w-4xl">
        <div className="text-center">
          <div className="section-eyebrow">Help & support</div>
          <h1 className="page-title mt-2">How can we help you?</h1>
          <div className="search-box mx-auto mt-7 max-w-xl">
            <Icon name="search" className="text-slate-400" />
            <input placeholder="Search help topics" />
          </div>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {[
            ["calendar", "Booking appointments", "Reschedule, cancel, and prepare for a visit"],
            ["hospital", "Finding hospital care", "Understand resources and availability labels"],
            ["ambulance", "Emergency & transport", "SOS requests, ambulances, and live status"],
            ["user", "Account & profile", "Login, privacy, and personal information"],
          ].map(([i, t, d]) => (
            <button className="panel flex gap-4 p-6 text-left hover:border-blue-200" key={t}>
              <span className="icon-tile blue">
                <Icon name={i as IconName} />
              </span>
              <span>
                <b>{t}</b>
                <small className="mt-1 block text-slate-500">{d}</small>
              </span>
              <Icon name="chevron" className="ml-auto text-slate-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="bg-[#071c30] text-white">
      <div className="site-container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo inverse onClick={() => navigate("home")} />
          <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
            Connecting people to trusted, real-time healthcare information when it matters most.
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm text-slate-300">
            <Icon name="call" size={16} className="text-teal-400" /> 24×7 Helpline: 1800-123-CARE
          </p>
        </div>
        <FooterCol
          title="Explore"
          links={[
            ["Find hospitals", "hospitals"],
            ["Book appointment", "booking"],
            ["Emergency SOS", "emergency"],
            ["Ambulance", "transport"],
          ]}
          navigate={navigate}
        />
        <FooterCol
          title="Company"
          links={[
            ["About us", "about"],
            ["Contact us", "contact"],
            ["Hospital partner", "register-hospital"],
            ["Admin login", "admin-login"],
          ]}
          navigate={navigate}
        />
        <FooterCol
          title="Support"
          links={[
            ["Help centre", "help"],
            ["Privacy policy", "help"],
            ["Terms of service", "help"],
            ["Accessibility", "help"],
          ]}
          navigate={navigate}
        />
      </div>
      <div className="border-t border-white/10">
        <div className="site-container flex flex-wrap justify-between gap-3 py-5 text-xs text-slate-500">
          <span>© 2025 CurePlus. All rights reserved.</span>
          <span>Built for healthier communities.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  navigate,
}: {
  title: string;
  links: [string, Page][];
  navigate: (p: Page) => void;
}) {
  return (
    <div>
      <h3 className="text-sm font-bold">{title}</h3>
      <div className="mt-4 space-y-3">
        {links.map(([x, p]) => (
          <button
            className="block text-sm text-slate-400 hover:text-white"
            onClick={() => navigate(p)}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
    </div>
  );
}

const adminNav: [IconName, string, Page][] = [
  ["home", "Dashboard", "admin"],
  ["bed", "Bed management", "admin-resources"],
  ["oxygen", "Oxygen & medicines", "admin-resources"],
  ["doctor", "Doctors", "admin-doctors"],
  ["calendar", "Appointments", "admin-appointments"],
  ["ambulance", "Ambulance", "admin-resources"],
  ["activity", "Emergency requests", "admin-emergency"],
  ["settings", "Settings", "admin"],
];

function AdminShell({
  page,
  navigate,
  notify,
}: {
  page: Page;
  navigate: (p: Page) => void;
  notify: (m: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <div className="px-6 py-6">
          <Logo inverse onClick={() => navigate("home")} />
        </div>
        <div className="mx-4 mb-5 rounded-xl bg-white/5 p-3">
          <p className="text-xs text-slate-400">Hospital workspace</p>
          <b className="mt-1 block text-sm text-white">Apollo New Delhi</b>
        </div>
        <nav className="px-3">
          {adminNav.map(([icon, label, route]) => (
            <button
              onClick={() => {
                navigate(route);
                setOpen(false);
              }}
              className={`admin-nav ${page === route ? "active" : ""}`}
              key={label}
            >
              <Icon name={icon} size={18} /> {label}
              {label === "Emergency requests" && <span>3</span>}
            </button>
          ))}
        </nav>
        <button
          onClick={() => navigate("admin-login")}
          className="admin-nav absolute bottom-5 left-3 right-3 w-auto"
        >
          <Icon name="logout" size={18} /> Sign out
        </button>
      </aside>
      <div className="admin-main">
        <header className="admin-header">
          <button onClick={() => setOpen(!open)} className="lg:hidden">
            <Icon name="menu" />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <button className="notification">
              <Icon name="bell" size={19} />
              <span />
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <span className="avatar">DM</span>
            <span className="hidden text-left sm:block">
              <b className="block text-xs">Dr. Mohit Arora</b>
              <small className="text-[10px] text-slate-400">Hospital Administrator</small>
            </span>
          </div>
        </header>
        <main className="admin-content">
          {page === "admin" && <AdminDashboard navigate={navigate} />}
          {page === "admin-resources" && <AdminResources notify={notify} />}
          {page === "admin-doctors" && <AdminDoctors notify={notify} />}
          {page === "admin-appointments" && <AdminAppointments notify={notify} />}
          {page === "admin-emergency" && <AdminEmergency notify={notify} />}
        </main>
      </div>
    </div>
  );
}

function AdminTitle({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function AdminDashboard({ navigate }: { navigate: (p: Page) => void }) {
  const stats = [
    ["bed", "Available beds", "16", "of 106 total", "blue"],
    ["activity", "ICU occupancy", "80%", "16 of 20 occupied", "amber"],
    ["calendar", "Today’s appointments", "42", "8 awaiting action", "teal"],
    ["ambulance", "Ambulances ready", "3", "of 5 vehicles", "green"],
  ] as [IconName, string, string, string, string][];
  return (
    <>
      <AdminTitle title="Hospital dashboard" subtitle="Monday, 24 June · Last updated just now">
        <button className="btn btn-primary">
          <Icon name="edit" size={16} /> Update resources
        </button>
      </AdminTitle>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([i, l, v, n, tone]) => (
          <div className="admin-stat" key={l}>
            <span className={`icon-tile ${tone}`}>
              <Icon name={i} />
            </span>
            <p>{l}</p>
            <strong>{v}</strong>
            <small>{n}</small>
          </div>
        ))}
      </div>
      <div className="mt-7 grid gap-6 xl:grid-cols-[1.4fr_.6fr]">
        <section className="panel p-6">
          <div className="flex justify-between">
            <h2 className="panel-title">Resource overview</h2>
            <button onClick={() => navigate("admin-resources")} className="text-link">
              Manage resources
            </button>
          </div>
          <div className="mt-6 space-y-5">
            <Progress label="General beds" value="74 occupied" percent={86} color="bg-blue-600" />
            <Progress label="ICU beds" value="16 occupied" percent={80} color="bg-amber-500" />
            <Progress
              label="Oxygen reserve"
              value="82% capacity"
              percent={82}
              color="bg-teal-500"
            />
            <Progress
              label="Essential medicines"
              value="94% stocked"
              percent={94}
              color="bg-emerald-500"
            />
          </div>
        </section>
        <section className="panel p-6">
          <h2 className="panel-title">Live activity</h2>
          <div className="mt-5 space-y-5">
            {[
              ["activity", "Emergency request received", "2 min ago"],
              ["calendar", "Appointment confirmed", "8 min ago"],
              ["bed", "ICU bed marked available", "14 min ago"],
              ["ambulance", "Ambulance returned", "21 min ago"],
            ].map(([i, t, time]) => (
              <div className="flex gap-3" key={t}>
                <span className="icon-tile blue">
                  <Icon name={i as IconName} size={16} />
                </span>
                <div>
                  <p className="text-xs font-semibold">{t}</p>
                  <small className="text-[11px] text-slate-400">{time}</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="panel mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <h2 className="panel-title">Today’s appointments</h2>
          <button onClick={() => navigate("admin-appointments")} className="text-link">
            View all
          </button>
        </div>
        <AdminAppointmentTable compact />
      </div>
    </>
  );
}

function Progress({
  label,
  value,
  percent,
  color,
}: {
  label: string;
  value: string;
  percent: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs">
        <b>{label}</b>
        <span className="text-slate-500">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function AdminResources({ notify }: { notify: (m: string) => void }) {
  const [general, setGeneral] = useState(12);
  const [icu, setIcu] = useState(4);
  return (
    <>
      <AdminTitle
        title="Bed & resource management"
        subtitle="Keep public availability accurate and up to date."
      >
        <button
          onClick={() => notify("Resource availability published successfully.")}
          className="btn btn-primary"
        >
          Publish updates
        </button>
      </AdminTitle>
      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <div className="panel p-6">
          <h2 className="panel-title">Bed availability</h2>
          <p className="mt-1 text-xs text-slate-400">
            Changes are reflected publicly after publishing.
          </p>
          <div className="mt-6 space-y-5">
            <Counter
              label="Available general beds"
              value={general}
              setValue={setGeneral}
              total={86}
              icon="bed"
            />
            <Counter
              label="Available ICU beds"
              value={icu}
              setValue={setIcu}
              total={20}
              icon="activity"
            />
          </div>
        </div>
        <div className="panel p-6">
          <h2 className="panel-title">Medical resources</h2>
          <div className="mt-6 space-y-4">
            <ToggleRow icon="oxygen" label="Central oxygen supply" detail="82% reserve capacity" />
            <ToggleRow
              icon="medicine"
              label="Essential medicines"
              detail="94% of critical stock available"
            />
            <ToggleRow
              icon="ambulance"
              label="Emergency ambulances"
              detail="3 of 5 vehicles ready"
            />
          </div>
        </div>
      </div>
      <div className="panel mt-6 p-6">
        <h2 className="panel-title">Medicine stock alerts</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Stock label="Adrenaline injection" count="18 units" level="Low stock" tone="amber" />
          <Stock label="Insulin" count="124 units" level="In stock" tone="green" />
          <Stock label="Normal saline" count="286 units" level="In stock" tone="green" />
        </div>
      </div>
    </>
  );
}

function Counter({
  label,
  value,
  setValue,
  total,
  icon,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
  total: number;
  icon: IconName;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
      <span className="icon-tile blue">
        <Icon name={icon} />
      </span>
      <div className="flex-1">
        <b className="text-sm">{label}</b>
        <small className="block text-xs text-slate-400">{total} total capacity</small>
      </div>
      <div className="flex items-center rounded-lg border border-slate-200">
        <button onClick={() => setValue(Math.max(0, value - 1))} className="h-9 w-9 text-lg">
          −
        </button>
        <b className="w-10 text-center text-sm">{value}</b>
        <button onClick={() => setValue(value + 1)} className="h-9 w-9 text-lg">
          +
        </button>
      </div>
    </div>
  );
}

function ToggleRow({ icon, label, detail }: { icon: IconName; label: string; detail: string }) {
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
      <span className="icon-tile teal">
        <Icon name={icon} />
      </span>
      <div className="flex-1">
        <b className="text-sm">{label}</b>
        <small className="block text-xs text-slate-400">{detail}</small>
      </div>
      <button onClick={() => setOn(!on)} className={`toggle ${on ? "on" : ""}`}>
        <span />
      </button>
    </div>
  );
}

function Stock({
  label,
  count,
  level,
  tone,
}: {
  label: string;
  count: string;
  level: string;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex justify-between">
        <span className={`icon-tile ${tone}`}>
          <Icon name="medicine" />
        </span>
        <span className={`badge ${tone === "green" ? "green-badge" : "amber-badge"}`}>{level}</span>
      </div>
      <b className="mt-4 block text-sm">{label}</b>
      <small className="text-slate-400">{count}</small>
    </div>
  );
}

function AdminDoctors({ notify }: { notify: (m: string) => void }) {
  return (
    <>
      <AdminTitle
        title="Doctors & schedules"
        subtitle="Manage profiles, specialities, and consultation hours."
      >
        <button onClick={() => notify("Doctor profile form opened.")} className="btn btn-primary">
          <Icon name="plus" size={16} /> Add doctor
        </button>
      </AdminTitle>
      <div className="panel mt-7 overflow-hidden">
        <div className="flex flex-wrap gap-3 border-b border-slate-100 p-5">
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-slate-50 px-3">
            <Icon name="search" size={16} className="text-slate-400" />
            <input
              className="h-10 flex-1 bg-transparent text-sm outline-none"
              placeholder="Search doctors"
            />
          </div>
          <button className="btn btn-outline">All specialities</button>
        </div>
        <div>
          {doctors.map((d, i) => (
            <div className="admin-doctor" key={d.name}>
              <span className={`avatar-lg ${d.color}`}>{d.initials}</span>
              <div className="flex-1">
                <h3>{d.name}</h3>
                <p>
                  {d.role} · {d.exp}
                </p>
              </div>
              <div className="hidden sm:block">
                <small className="text-slate-400">Today’s schedule</small>
                <b className="block text-xs">{d.time}</b>
              </div>
              <span className={`badge ${i === 1 ? "amber-badge" : "green-badge"}`}>
                {i === 1 ? "In consultation" : "Available"}
              </span>
              <button
                onClick={() => notify(`${d.name}'s schedule is ready to edit.`)}
                className="btn btn-ghost"
              >
                <Icon name="edit" size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AdminAppointments({ notify }: { notify: (m: string) => void }) {
  return (
    <>
      <AdminTitle
        title="Appointment management"
        subtitle="Review and manage patient consultation requests."
      >
        <button className="btn btn-outline">
          <Icon name="calendar" size={16} /> 24 June 2025
        </button>
      </AdminTitle>
      <div className="mt-7 flex gap-2">
        {["All 42", "Pending 8", "Confirmed 29", "Completed 5"].map((x, i) => (
          <button className={`filter-pill ${i === 0 ? "selected" : ""}`} key={x}>
            {x}
          </button>
        ))}
      </div>
      <div className="panel mt-5 overflow-hidden">
        <AdminAppointmentTable onAction={notify} />
      </div>
    </>
  );
}

function AdminAppointmentTable({
  compact = false,
  onAction,
}: {
  compact?: boolean;
  onAction?: (m: string) => void;
}) {
  const rows = [
    ["Aarav Sharma", "Dr. Ananya Mehta", "10:30 AM", "Cardiology", "Pending"],
    ["Meera Joshi", "Dr. Rohan Kapoor", "11:00 AM", "Neurology", "Confirmed"],
    ["Kabir Singh", "Dr. Priya Nair", "11:30 AM", "General Medicine", "Confirmed"],
    ["Sara Khan", "Dr. Ananya Mehta", "12:00 PM", "Cardiology", "Pending"],
  ];
  return (
    <div className="overflow-auto">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Time</th>
            <th>Department</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, compact ? 3 : 4).map((r) => (
            <tr key={r[0]}>
              <td>
                <b>{r[0]}</b>
                <small>#SC{Math.floor(Math.random() * 8000 + 1000)}</small>
              </td>
              <td>{r[1]}</td>
              <td>{r[2]}</td>
              <td>{r[3]}</td>
              <td>
                <span className={`badge ${r[4] === "Confirmed" ? "green-badge" : "amber-badge"}`}>
                  {r[4]}
                </span>
              </td>
              <td>
                {r[4] === "Pending" ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => onAction?.(`${r[0]}'s appointment accepted.`)}
                      className="icon-button accept"
                    >
                      <Icon name="check" size={15} />
                    </button>
                    <button
                      onClick={() => onAction?.(`${r[0]}'s request declined.`)}
                      className="icon-button decline"
                    >
                      <Icon name="close" size={15} />
                    </button>
                  </div>
                ) : (
                  <button className="text-link">View</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminEmergency({ notify }: { notify: (m: string) => void }) {
  return (
    <>
      <AdminTitle
        title="Emergency requests"
        subtitle="Prioritize and coordinate incoming emergency cases."
      >
        <span className="badge red-badge">
          <span className="live-dot red mr-2" /> 3 active requests
        </span>
      </AdminTitle>
      <div className="mt-7 space-y-4">
        {[
          ["Critical", "Rohit Verma", "Chest pain, difficulty breathing", "1.2 km", "2 min ago"],
          [
            "High priority",
            "Unknown patient",
            "Road accident, possible fracture",
            "3.4 km",
            "6 min ago",
          ],
          ["Moderate", "Nisha Gupta", "High fever, disorientation", "4.1 km", "9 min ago"],
        ].map((r, i) => (
          <div className={`emergency-request ${i === 0 ? "critical" : ""}`} key={r[1]}>
            <div className="flex items-start gap-4">
              <span className={`icon-tile ${i === 0 ? "red" : "amber"}`}>
                <Icon name="activity" />
              </span>
              <div>
                <div className="flex flex-wrap gap-2">
                  <h3>{r[1]}</h3>
                  <span className={`badge ${i === 0 ? "red-badge" : "amber-badge"}`}>{r[0]}</span>
                </div>
                <p>{r[2]}</p>
                <small>
                  <Icon name="location" size={13} /> {r[3]} away · {r[4]}
                </small>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => notify(`Emergency request for ${r[1]} accepted.`)}
                className="btn btn-primary"
              >
                Accept request
              </button>
              <button onClick={() => notify(`Calling ${r[1]}…`)} className="btn btn-outline">
                <Icon name="call" size={16} /> Call
              </button>
              <button className="btn btn-ghost">
                <Icon name="map" size={16} /> Map
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

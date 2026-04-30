import React, { useEffect, useState } from 'react';
import {
  X,
  Menu,
  ChevronDown,
  Search,
  Phone,
  CloudSun,
  Loader2,
} from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import type { LanguageType } from '../../types/index';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import sanPabloCitySeal from '../../assets/san-pablo-city-seal.png';

const NAVBAR_LANGUAGES: LanguageType[] = ['en', 'fil'];

const EMERGENCY_HOTLINES = [
  {
    label: 'CDRRMO Emergency',
    number: '0998 540 7171',
    href: 'tel:09985407171',
  },
  {
    label: 'PNP (Police HQ)',
    number: '(049) 562-8765',
    href: 'tel:+63495628765',
  },
  {
    label: 'BFP (Fire Department)',
    number: '(049) 562-4321',
    href: 'tel:+63495624321',
  },
  {
    label: 'Ambulance / Emergency',
    number: '911',
    href: 'tel:911',
  },
];

interface WeatherState {
  temperature: number | null;
  windSpeed: number | null;
  weatherCode: number | null;
  updatedAt: string | null;
  loading: boolean;
}

const WEATHER_ENDPOINT =
  'https://api.open-meteo.com/v1/forecast?latitude=14.0686&longitude=121.3250&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FManila&forecast_days=1';

const getWeatherLabel = (code: number | null): string => {
  if (code === null) return 'Unavailable';
  if (code === 0) return 'Clear';
  if ([1, 2, 3].includes(code)) return 'Cloudy';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Variable';
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherState>({
    temperature: null,
    windSpeed: null,
    weatherCode: null,
    updatedAt: null,
    loading: true,
  });
  const { t, i18n } = useTranslation('common');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveMenu(null);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  const toggleSubmenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  const changeLanguage = (newLanguage: LanguageType) => {
    i18n.changeLanguage(newLanguage);
  };

  const isLanguageActive = (code: LanguageType) =>
    i18n.language === code || i18n.language.startsWith(`${code}-`);

  useEffect(() => {
    let isCancelled = false;

    const fetchWeather = async () => {
      try {
        const response = await fetch(WEATHER_ENDPOINT);
        if (!response.ok) {
          throw new Error('Weather fetch failed');
        }

        const data = await response.json();
        const current = data?.current;

        if (!isCancelled) {
          setWeather({
            temperature:
              typeof current?.temperature_2m === 'number'
                ? current.temperature_2m
                : null,
            windSpeed:
              typeof current?.wind_speed_10m === 'number'
                ? current.wind_speed_10m
                : null,
            weatherCode:
              typeof current?.weather_code === 'number'
                ? current.weather_code
                : null,
            updatedAt:
              typeof current?.time === 'string' ? current.time : null,
            loading: false,
          });
        }
      } catch {
        if (!isCancelled) {
          setWeather(previous => ({
            ...previous,
            loading: false,
          }));
        }
      }
    };

    fetchWeather();
    const intervalId = setInterval(fetchWeather, 10 * 60 * 1000);

    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  const weatherLabel = getWeatherLabel(weather.weatherCode);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Emergency hotline bar */}
      <div className="bg-red-700 text-white">
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              <span className="inline-flex items-center font-semibold uppercase tracking-wide">
                <Phone className="h-3.5 w-3.5 mr-1.5" />
                San Pablo Emergency Hotlines
              </span>
              {EMERGENCY_HOTLINES.map(hotline => (
                <a
                  key={hotline.label}
                  href={hotline.href}
                  className="inline-flex items-center hover:text-red-100 transition-colors"
                >
                  <span className="font-medium">{hotline.label}:</span>
                  <span className="ml-1">{hotline.number}</span>
                </a>
              ))}
            </div>

            <div className="inline-flex items-center self-start rounded-md border border-white/30 bg-black/20 px-3 py-1.5 text-xs xl:self-auto">
              <CloudSun className="mr-1.5 h-3.5 w-3.5" />
              <span className="mr-2 inline-flex items-center font-semibold">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                Live Weather
              </span>
              {weather.loading ? (
                <span className="inline-flex items-center">
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Updating...
                </span>
              ) : weather.temperature !== null ? (
                <span>
                  San Pablo: {Math.round(weather.temperature)} degC,{' '}
                  {weatherLabel}
                  {weather.windSpeed !== null && (
                    <span> | {Math.round(weather.windSpeed)} km/h</span>
                  )}
                </span>
              ) : (
                <span>San Pablo weather unavailable</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Top bar with language switcher and additional links */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 hidden md:flex justify-end items-center h-11">
          <div className="flex items-center space-x-4">
            <a
              href="https://bettergov.ph/join-us"
              className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              Join Us
            </a>
            <a
              href="https://www.gov.ph"
              className="text-sm text-gray-800 hover:text-primary-600 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              Official Gov.ph
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2.5 md:py-3">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={sanPabloCitySeal}
                alt="Official seal of San Pablo City, Laguna"
                className="h-[72px] w-[72px] mr-3 object-contain"
              />
              <div>
                <div className="text-black font-bold text-lg leading-tight">
                  {import.meta.env.VITE_GOVERNMENT_NAME}
                </div>
                <div className="text-xs text-gray-800">
                  {t('site_description')}
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8 pr-24">
            {mainNavigation.map(item => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  className="flex items-center text-gray-700 hover:text-primary-600 font-medium text-base transition-colors"
                >
                  {t(`navbar.${item.label.replace(' ', '').toLowerCase()}`)}
                  {item.children && (
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-800 group-hover:text-primary-600 transition-colors" />
                  )}
                </a>
                {item.children && (
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      {item.children.map(child => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                          role="menuitem"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/about"
              className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              About San Pablo
            </Link>
            <Link
              to="/search"
              className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              <Search className="h-4 w-4 mr-1" />
              Search
            </Link>
            <div className="ml-1 flex items-center gap-2">
              {NAVBAR_LANGUAGES.map(code => {
                const isActive = isLanguageActive(code);
                const label = code === 'en' ? 'English' : 'Filipino';

                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => changeLanguage(code)}
                    className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                      isActive
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500 hover:text-primary-700'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            {/* <Link
              to="/sitemap"
              className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Sitemap
            </Link> */}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-2 pt-2 pb-4 space-y-1 border-t border-gray-200 bg-white">
          {mainNavigation.map(item => (
            <div key={item.label}>
              <button
                onClick={() => toggleSubmenu(item.label)}
                className="w-full flex justify-between items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
              >
                {t(`navbar.${item.label.toLowerCase()}`)}
                {item.children && (
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      activeMenu === item.label ? 'transform rotate-180' : ''
                    }`}
                  />
                )}
              </button>
              {item.children && activeMenu === item.label && (
                <div className="pl-6 py-2 space-y-1 bg-gray-50">
                  {item.children.map(child => (
                    <Link
                      key={child.label}
                      to={child.href}
                      onClick={closeMenu}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-500"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            to="/join-us"
            onClick={closeMenu}
            className="block px-4 py-2 text-base font-semibold text-primary-600 hover:bg-primary-50 hover:text-primary-700"
          >
            Join Us
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
          >
            About San Pablo
          </Link>
          <Link
            to="/search"
            onClick={closeMenu}
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
          >
            Search
          </Link>
          <Link
            to="/sitemap"
            onClick={closeMenu}
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
          >
            Sitemap
          </Link>
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              {NAVBAR_LANGUAGES.map(code => {
                const isActive = isLanguageActive(code);
                const label = code === 'en' ? 'English' : 'Filipino';

                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => changeLanguage(code)}
                    className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                      isActive
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500 hover:text-primary-700'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

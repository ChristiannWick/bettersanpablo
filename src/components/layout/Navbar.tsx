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
import betterSanPabloLogo from '../../assets/bettersanpablo-logo3.png';

const NAVBAR_LANGUAGES: LanguageType[] = ['en', 'fil'];

interface HotlineEntry {
  labelKey: string;
  defaultLabel: string;
  number: string;
  href: string;
}

const EMERGENCY_HOTLINES: HotlineEntry[] = [
  {
    labelKey: 'navbar.hotlinesList.cdrrmo',
    defaultLabel: 'CDRRMO Emergency',
    number: '0998 540 7171',
    href: 'tel:09985407171',
  },
  {
    labelKey: 'navbar.hotlinesList.pnp',
    defaultLabel: 'PNP (Police HQ)',
    number: '(049) 562-8765',
    href: 'tel:+63495628765',
  },
  {
    labelKey: 'navbar.hotlinesList.bfp',
    defaultLabel: 'BFP (Fire Department)',
    number: '(049) 562-4321',
    href: 'tel:+63495624321',
  },
  {
    labelKey: 'navbar.hotlinesList.ambulance',
    defaultLabel: 'Ambulance / Emergency',
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

const getWeatherKey = (code: number | null): string => {
  if (code === null) return 'unavailable';
  if (code === 0) return 'clear';
  if ([1, 2, 3].includes(code)) return 'cloudy';
  if ([45, 48].includes(code)) return 'fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  if ([95, 96, 99].includes(code)) return 'thunderstorm';
  return 'variable';
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

  const weatherLabel = t(`navbar.weather.${getWeatherKey(weather.weatherCode)}`);

  // Marquee uses pure CSS animation (see index.css `.marquee-track`).
  // Pure CSS is more reliable than a JS rAF loop because it doesn't
  // accumulate stale time deltas when the tab is hidden.

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Emergency hotline bar (auto-scrolling marquee — CSS-driven) */}
      <div className="bg-red-700 text-white">
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex items-center">
            <div className="marquee w-full overflow-hidden">
              <div className="marquee-track inline-flex items-center gap-6 whitespace-nowrap">
                <div className="inline-flex items-center gap-3">
                  <span className="inline-flex items-center font-semibold uppercase tracking-wide shrink-0">
                    <Phone className="h-3.5 w-3.5 mr-1.5" />
                    {t('navbar.emergencyHotlinesLabel')}
                  </span>
                  {EMERGENCY_HOTLINES.map(hotline => (
                    <a
                      key={hotline.labelKey}
                      href={hotline.href}
                      className="inline-flex items-center hover:text-red-100 transition-colors shrink-0 ml-3"
                    >
                      <span className="font-medium">{t(hotline.labelKey, hotline.defaultLabel)}:</span>
                      <span className="ml-1">{hotline.number}</span>
                    </a>
                  ))}
                </div>

                {/* duplicate content for seamless loop */}
                <div className="inline-flex items-center gap-3" aria-hidden>
                  <span className="inline-flex items-center font-semibold uppercase tracking-wide shrink-0">
                    <Phone className="h-3.5 w-3.5 mr-1.5" />
                    {t('navbar.emergencyHotlinesLabel')}
                  </span>
                  {EMERGENCY_HOTLINES.map(hotline => (
                    <span key={`${hotline.labelKey}-dup`} className="inline-flex items-center ml-3">
                      <span className="font-medium">{t(hotline.labelKey, hotline.defaultLabel)}:</span>
                      <span className="ml-1">{hotline.number}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather strip (separate section) */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-end">
          <div className="inline-flex items-center gap-3 text-xs md:text-sm text-gray-700">
            <CloudSun className="h-5 w-5 text-yellow-500" />
            {weather.loading ? (
              <span className="inline-flex items-center text-gray-700">
                <Loader2 className="mr-1 h-4 w-4 animate-spin text-gray-500" />
                {t('navbar.updatingWeather')}
              </span>
            ) : weather.temperature !== null ? (
              <span>
                {t('navbar.weatherFormat', {
                  temp: Math.round(weather.temperature),
                  label: weatherLabel,
                })}
                {weather.windSpeed !== null && (
                  <span> | {Math.round(weather.windSpeed)} km/h</span>
                )}
              </span>
            ) : (
              <span>{t('navbar.weatherUnavailable')}</span>
            )}
          </div>
        </div>
      </div>


      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 md:py-3 lg:py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={betterSanPabloLogo}
                alt="BetterSanPablo.org logo"
                decoding="async"
                fetchPriority="high"
                className="h-16 sm:h-20 lg:h-28 w-auto max-w-[200px] lg:max-w-[320px] mr-4 object-contain flex-shrink-0"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link
              to="/"
              className="flex items-center text-gray-700 hover:text-primary-600 font-medium text-base transition-colors whitespace-nowrap"
            >
              {t('common.home')}
            </Link>
            {mainNavigation.map(item => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  className="flex items-center text-gray-700 hover:text-primary-600 font-medium text-base transition-colors"
                >
                  {t(`navbar.${item.label.replace(/\s+/g, '').toLowerCase()}`)}
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
              to="/search"
              className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              <Search className="h-4 w-4 mr-1" />
              {t('common.search')}
            </Link>
            {/* Minimalist language toggle (desktop) — EN | FIL */}
            <div className="ml-1 inline-flex items-center rounded-full border border-gray-200 bg-white text-xs">
              {NAVBAR_LANGUAGES.map(code => {
                const isActive = isLanguageActive(code);
                const label = code === 'en' ? 'EN' : 'FIL';
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => changeLanguage(code)}
                    aria-pressed={isActive}
                    aria-label={code === 'en' ? t('common.switchToEnglish') : t('common.switchToFilipino')}
                    className={`px-3 py-1 font-semibold tracking-wide transition-colors first:rounded-l-full last:rounded-r-full ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 hover:text-primary-600'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile right side — compact language toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Minimalist language toggle (mobile/tablet) */}
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-white text-xs">
              {NAVBAR_LANGUAGES.map(code => {
                const isActive = isLanguageActive(code);
                const label = code === 'en' ? 'EN' : 'FIL';
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => changeLanguage(code)}
                    aria-pressed={isActive}
                    aria-label={code === 'en' ? t('common.switchToEnglish') : t('common.switchToFilipino')}
                    className={`px-2.5 py-1 font-semibold tracking-wide transition-colors first:rounded-l-full last:rounded-r-full ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 hover:text-primary-600'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">{t('common.openMainMenu')}</span>
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
          <Link
            to="/"
            onClick={closeMenu}
            className="block w-full px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
          >
            {t('common.home')}
          </Link>
          {mainNavigation.map(item => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="w-full flex justify-between items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                  >
                    {t(`navbar.${item.label.toLowerCase()}`)}
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        activeMenu === item.label ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {activeMenu === item.label && (
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
                </>
              ) : (
                <Link
                  to={item.href}
                  onClick={closeMenu}
                  className="block w-full px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                >
                  {t(`navbar.${item.label.toLowerCase()}`)}
                </Link>
              )}
            </div>
          ))}
          <Link
            to="/search"
            onClick={closeMenu}
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
          >
            {t('common.search')}
          </Link>
          <Link
            to="/sitemap"
            onClick={closeMenu}
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
          >
            {t('common.sitemap')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

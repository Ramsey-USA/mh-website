# Location Evidence Matrix (Phase 6.5)

Category: Technical - Local SEO Controls
Last Updated: July 19, 2026
Scope: Existing published Locations hub and city routes

## Purpose

This matrix records location-level evidence controls used to keep local SEO tied to verified repository data and to prevent false-office behavior on service-area pages.

## Control Rules

- Only Pasco is treated as a public office location.
- All other city routes are service-area records served from Pasco headquarters.
- Service-area records do not emit office-grade LocalBusiness fields such as PostalAddress, GeoCoordinates, or OpeningHours.
- Location deep links use canonical service and project detail slugs only.

## Evidence Matrix

| Location Slug | Presence Type | Public Address Policy | Regional Relationship                   | Related Services (Canonical)                              | Related Projects (Canonical)                                                                       | Public-Sector Context                                  | Schema Eligibility            |
| ------------- | ------------- | --------------------- | --------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------- |
| richland      | service-area  | service-area-only     | Served from Pasco headquarters          | commercial-construction, agricultural-winery-construction | none                                                                                               | Municipal/public-sector support through regional teams | Service + areaServed only     |
| kennewick     | service-area  | service-area-only     | Served from Pasco headquarters          | commercial-construction, commercial-tenant-improvements   | auto-lot-nw                                                                                        | Public-sector support via Tri-Cities controls          | Service + areaServed only     |
| pasco         | office        | public-office-address | Headquarters and public office location | commercial-construction, municipal-public-work            | volm-companies-remodel, darigold-pasco-production-facility, franklin-county-coroners-office-morgue | Municipal coordination through Pasco office            | LocalBusiness + office fields |
| yakima        | service-area  | service-area-only     | Served from Pasco headquarters          | municipal-public-work, commercial-construction            | none                                                                                               | Veteran-led public-sector pathways                     | Service + areaServed only     |
| spokane       | service-area  | service-area-only     | Served from Pasco headquarters          | light-industrial-construction, commercial-construction    | none                                                                                               | Regional public-sector support available               | Service + areaServed only     |
| tacoma        | service-area  | service-area-only     | Served from Pasco headquarters          | municipal-public-work, procurement-trade-partnerships     | none                                                                                               | Regional public-sector support available               | Service + areaServed only     |
| west-richland | service-area  | service-area-only     | Served from Pasco headquarters          | commercial-construction, preconstruction-planning         | none                                                                                               | Regional public-sector support available               | Service + areaServed only     |
| walla-walla   | service-area  | service-area-only     | Served from Pasco headquarters          | commercial-construction, preconstruction-planning         | none                                                                                               | Tri-state government pathway support                   | Service + areaServed only     |
| hermiston     | service-area  | service-area-only     | Served from Pasco headquarters          | municipal-public-work, agricultural-winery-construction   | none                                                                                               | Tri-state government pathway support                   | Service + areaServed only     |
| pendleton     | service-area  | service-area-only     | Served from Pasco headquarters          | municipal-public-work, commercial-construction            | none                                                                                               | Tri-state government pathway support                   | Service + areaServed only     |
| coeur-d-alene | service-area  | service-area-only     | Served from Pasco headquarters          | light-industrial-construction, commercial-construction    | none                                                                                               | Regional public-sector support available               | Service + areaServed only     |
| omak          | service-area  | service-area-only     | Served from Pasco headquarters          | municipal-public-work, preconstruction-planning           | none                                                                                               | Regional public-sector support available               | Service + areaServed only     |

## Validation Notes

- `getLocationEvidenceProfile()` defines presence policy, address policy, regional relationship, and canonical related records for each location slug.
- `generateLocationMetadata()` emits geo metadata only for office-eligible locations.
- `LocationPageContent` renders Service schema for service-area records and LocalBusiness schema only for the office record.
- Location deep links are canonicalized to `/services/[slug]` and `/projects/[slug]`.

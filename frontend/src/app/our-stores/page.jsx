import React from 'react';
import WebLayOut from '../Layout/WebLayout';
import Link from 'next/link';

const locations = [
    {
        title: 'Mini Bazar Multiplex HP',
        postalCode: '395006',
        address: 'SHOP NO. 2-3, BASEMENT, Vishnu complex, Beside Central Bazaar, Opp. Varachha, Varachha Main Rd, Kodiyar Nagar, Surat, Gujarat 395006',
        diraction: "https://www.google.com/maps/place/Vishnu+Complex/@21.2087138,72.8532705,15z/data=!4m10!1m2!2m1!1sSHOP+NO.+2-3,+BASEMENT,+vishnu+complex,+POLICE+STATION,+PLOT+NO.+158%2FB,+Varachha+Main+Rd,+opp.+SUMANGAL+SOC,+Varachha,+Surat,+Gujarat+395006!3m6!1s0x3be04fcc3c6fc6cf:0x8dc4c331e439c846!8m2!3d21.2098824!4d72.8494999!15sCowBU0hPUCBOTy4gMi0zLCBCQVNFTUVOVCwgdmlzaG51IGNvbXBsZXgsIFBPTElDRSBTVEFUSU9OLCBQTE9UIE5PLiAxNTgvQiwgVmFyYWNoaGEgTWFpbiBSZCwgb3BwLiBTVU1BTkdBTCBTT0MsIFZhcmFjaGhhLCBTdXJhdCwgR3VqYXJhdCAzOTUwMDaSAQ9zaG9wcGluZ19jZW50ZXLgAQA!16s%2Fg%2F11fkkzmpwc?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D",
        mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.3335028582056!2d72.8494999!3d21.2098824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fcc3c6fc6cf%3A0x8dc4c331e439c846!2sVishnu%20Complex!5e0!3m2!1sen!2sin!4v1617988013204!5m2!1sen!2sin"
    },
    {
        title: 'Mini Bazar HP',
        postalCode: '395006',
        address: 'Shop no 2, vishnu complex, Police Station, Varachha Main Rd, opposite Varachha, Kodiyar Nagar, Surat, Gujarat 395006',
        diraction: "https://www.google.com/maps/place/HP+World-Varachha/@21.2099144,72.849498,13z/data=!4m10!1m2!2m1!1shp+surat+mini+bajar!3m6!1s0x3be04f56abfde793:0x60cc11bf9521627a!8m2!3d21.2099144!4d72.849498!15sChNocCBzdXJhdCBtaW5pIGJhamFyIgOIAQFaFSITaHAgc3VyYXQgbWluaSBiYWphcpIBHmNvbXB1dGVyX2hhcmR3YXJlX21hbnVmYWN0dXJlcuABAA!16s%2Fg%2F11h7b2m7ws?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D",
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.321511882587!2d72.849498!3d21.2099144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f56abfde793%3A0x60cc11bf9521627a!2sHP%20World-Varachha!5e0!3m2!1sen!2sin!4v1705555555555!5m2!1sen!2sin'
    },
    {
        title: 'Vesu HP',
        postalCode: '395007',
        address: 'No GF37, Marvella Corridors Complex, opposite Avadh Arena, Vesu, Surat, Gujarat 395007',
        diraction: "https://www.google.com/maps/place/HP+World+-+Vesu/@21.1430124,72.7899208,17z/data=!4m17!1m10!3m9!1s0x3be053e895e5662f:0x20513d8d3094b66!2sHP+World+-+Vesu!8m2!3d21.1431675!4d72.7898864!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11k4jblsqp!3m5!1s0x3be053e895e5662f:0x20513d8d3094b66!8m2!3d21.1431675!4d72.7898864!16s%2Fg%2F11k4jblsqp?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D",
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.608451736201!2d72.78992081490064!3d21.14301238393952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be053e895e5662f%3A0x20513d8d3094b66!2sHP%20World%20-%20Vesu!5e0!3m2!1sen!2sin!4v1698587979574!5m2!1sen!2sin'
    },
    {
        title: 'Vesu ASUS',
        postalCode: '395007',
        address: 'Shop No G/38, Marvella Corridor, Avadh Arena, VIP Road, opposite Chroma, Bharthana, Surat, Gujarat 395007',
        diraction: "https://www.google.com/maps/place/ASUS+Exclusive+Store+-+Icon+Digital/@21.1430948,72.7135807,13z/data=!3m1!5s0x3be0520f29721213:0x27476c50d2bef321!4m10!1m2!2m1!1sAsus+near+Vesu,+Surat,+Gujarat!3m6!1s0x3be053d584f48077:0x88359369a7fc89a0!8m2!3d21.1430948!4d72.7897984!15sCh5Bc3VzIG5lYXIgVmVzdSwgU3VyYXQsIEd1amFyYXQiA4gBAVoeIhxhc3VzIG5lYXIgdmVzdSBzdXJhdCBndWphcmF0kgEOY29tcHV0ZXJfc3RvcmXgAQA!16s%2Fg%2F11srgh1smx?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D",
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.840398245972!2d72.7135807!3d21.1430948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be053d584f48077%3A0x88359369a7fc89a0!2sASUS%20Exclusive%20Store%20-%20Icon%20Digital!5e0!3m2!1sen!2sin!4v1705555555555!5m2!1sen!2sin'
    },
    {
        title: 'Mota Varachha HP',
        postalCode: '394101',
        address: 'Shop No 1, Ground Floor, AR Mall Utran, opposite Panvel Point, Mota Varachha, Surat, Gujarat 394101',
        diraction: "https://www.google.com/maps/place/HP+World+-+AR+Mall+and+Multiplex/@21.2352929,72.8678561,17z/data=!3m1!4b1!4m6!3m5!1s0x3be04f478d52eddb:0xe367f6a24bf607e4!8m2!3d21.235288!4d72.872727!16s%2Fg%2F11ldwjgmrc?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D",
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.894536679084!2d72.8678561!3d21.2352929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f478d52eddb%3A0xe367f6a24bf607e4!2sHP%20World%20-%20AR%20Mall%20and%20Multiplex!5e0!3m2!1sen!2sin!4v1705555555555!5m2!1sen!2sin'
    },
];

const OurStors = () => {
    return (
        <WebLayOut>
            <div className="w-full max-w-[1200px] sm:px-0 px-4 mx-auto">
                <h1 className="sm:text-5xl text-3xl font-bold text-center gradient-text SF_Pro sm:py-12 py-8 border-b border-[#E2E2E2]">
                    Our Stores
                </h1>
                <div className="sm:space-y-16 space-y-14 pt-16">
                    {locations.map((location, index) => (
                        <div key={index} className="sm:grid grid-cols-7 gap-4">
                            <div className="col-span-3">
                                <div className="flex items-end gap-x-4">
                                    <p className="font-semibold text-2xl gradient-text">{location.title} :</p>
                                    <p className="font-medium text-xl">{location.postalCode}</p>
                                </div>
                                <p className="max-w-[400px] pt-4">{location.address}</p>
                                <Link
                                    target="_blank"
                                    href={location.diraction}
                                    className="sm:px-7 inline-block px-6 mt-8 sm:py-3 py-3 button-linear-gradient text-white sm:text-base_40/5 text-sm font-medium rounded-full"
                                >
                                    Direction
                                </Link>
                            </div>
                            <div className="col-span-4 sm:mt-0 mt-8 h-[200px]">
                                <iframe
                                    src={location.mapLink}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </WebLayOut>
    );
};

export default OurStors;

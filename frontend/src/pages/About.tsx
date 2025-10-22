import React from 'react';
import { Users, Target, Award, Globe, Mail, MapPin, Phone } from 'lucide-react';
import ProfileTeam from '../assets/image/lang.JPG';

export default function About() {
  const teamMembers = [
    {
      name: 'Vin Solang',
      role: 'Web Developer',
      image: ProfileTeam,
      bio: 'Motivated Computer Science student with skills in frontend and backend web development. Experienced in HTML, CSS, JavaScript, PHP, Laravel, and MySQL, with a passion for creating responsive and user-friendly websites.'
    },
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Accuracy First',
      description: 'We prioritize fact-checking and verification to ensure every story we publish meets the highest standards of journalistic integrity.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Perspective',
      description: 'Our international network of correspondents brings you diverse viewpoints and comprehensive coverage from around the world.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Focused',
      description: 'We serve our readers by providing the information they need to make informed decisions and stay connected to their world.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence in Storytelling',
      description: 'We combine traditional journalism with modern multimedia approaches to tell stories that matter in engaging ways.'
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About eNews</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Delivering trusted news and premium entertainment content to millions of readers worldwide since our founding.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              At eNews, we believe in the power of informed communities. Our mission is to provide accurate, timely,
              and engaging news coverage while offering premium entertainment content that enriches the lives of our readers.
              We strive to be the bridge between global events and local impact, helping our audience understand the world around them.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Meet Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The passionate journalists and experts behind eNews
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow w-[280px]"
              >
                <div className="aspect-w-1 aspect-h-1 h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2M+</div>
              <div className="text-blue-100">Monthly Readers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Articles Published</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Countries Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Awards Won</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Have a story tip or want to collaborate? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-400">vinsolang9@gmail.com</p>
              <p className="text-gray-600 dark:text-gray-400">tips@enews.com</p>
            </div>

            <div className="p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
              <p className="text-gray-600 dark:text-gray-400">+855 89696675</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Mon-Fri, 9AM-6PM EST</p>
            </div>

            <div className="p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Visit Us</h3>
              <p className="text-gray-600 dark:text-gray-400">Welcome E News</p>
              <p className="text-gray-600 dark:text-gray-400">Phnom Penh, Cambodia</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
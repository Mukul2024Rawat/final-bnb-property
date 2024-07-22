// components/HostInfo.tsx

import React from 'react';
import Image from 'next/image';
import { Host } from '../../../interfaces/guest/listing/interface';

interface HostInfoProps {
  host: Host;
}

const HostInfo: React.FC<HostInfoProps> = ({ host }) => {
  return (
    <div className="">
      <div className="flex items-center mb-4">
        <Image src={host.image} alt={`Host ${host.name}`} width={64} height={64} className="rounded-full mr-4" />
        <div>
          <h2 className="text-xl font-semibold">Hosted by {host.name}</h2>
          <p className="text-gray-500">Joined in {host.joinDate}</p>
        </div>
      </div>
      <div className="mb-4">
        <p>★ {host.reviewCount} Reviews</p>
        <p>{host.isVerified ? 'Identity verified' : 'Identity not verified'}</p>
      </div>
      <p className="mb-4">{host.description}</p>
      <button className="border border-gray-900 rounded-lg px-4 py-2 font-semibold">
        Contact host
      </button>
    </div>
  );
};

export default HostInfo;
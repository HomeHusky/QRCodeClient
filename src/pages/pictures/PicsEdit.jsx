import * as React from 'react';
import { useEffect } from 'react';

import PicsComponent from "../../components/picturesAdmin/PicsEdit"
import "./picsedit.scss"
import { useBreadcrumb } from '../../context/breadCrumbContext';
const PicsEdit = () => {
  const { setBreadcrumbs } = useBreadcrumb();
  // useEffect(() => {
  //   // Update breadcrumbs when the component mounts
  //   setBreadcrumbs([
  //     { label: 'Trang chủ', path: '/' },
  //     { label: 'Quản lý tranh', path: '/pics' },
  //   ]);
  // }, [setBreadcrumbs]);
  return (
    <div className="home">
      <PicsComponent/>
    </div>
  )
}

export default PicsEdit
const inss = [
  {
    "min_wage": 0,
    "max_wage": 1045.00,
    "difference": 1045.00 - 0,
    "aliquot": 0.075
  },
  {
    "min_wage": 1045.01,
    "max_wage": 2089.60,
    "difference": 2089.60 - 1045.00,
    "aliquot": 0.090
  },
  {
    "min_wage": 2089.61,
    "max_wage": 3134.40,
    "difference": 3134.40 - 2089.60,
    "aliquot": 0.120
  },
  {
    "min_wage": 3134.41,
    "max_wage": 6101.06,
    "difference": 6101.06 - 3134.40,
    "aliquot": 0.140
  },
];

const inss_max_discount = 713.10;

const irpf = [
  {
    "min_wage": 1903.98,
    "aliquot": 0.075,
    "deductible": 142.80
  },
  {
    "min_wage": 2826.65,
    "aliquot": 0.150,
    "deductible": 354.80
  },
  {
    "min_wage": 3751.05,
    "aliquot": 0.225,
    "deductible": 636.13
  },
  {
    "min_wage": 4664.68,
    "aliquot": 0.275,
    "deductible": 869.36
  }
];

function getInssDiscount(salary) {
  let discount = 0;

  if (salary > inss[3].max_wage) {
    discount = inss_max_discount;
  } else {
    for (let i = 0; i < inss.length; i++) {
      let curRange = inss[i];
      if (salary > curRange.max_wage) {
        discount += curRange.difference * curRange.aliquot;
      } else {
        discount += (salary - curRange.min_wage) * curRange.aliquot;
        break;
      }
    }
  }

  return discount.toFixed(2);
}

function getIrpfDiscount(salary) {
  let discount = 0;

  irpf.forEach(range => {
    if (salary > range.min_wage) {
      discount = (salary * range.aliquot) - range.deductible;
    }
  });

  return discount.toFixed(2);
}

export function getSalary(gross) {
  const inss_discount = getInssDiscount(gross);
  const inss_percentage = gross === 0 ? 0 : inss_discount / gross;
  const irpf_base = gross - inss_discount;
  const irpf_discount = getIrpfDiscount(irpf_base);
  const irpf_percentage = gross === 0 ? 0 : irpf_discount / gross;
  const net_value = gross - inss_discount - irpf_discount;
  const net_percentage = net_value / gross;

  return ({
    inss_base: gross,
    inss_discount,
    inss_percentage,
    irpf_base,
    irpf_discount,
    irpf_percentage,
    net_value,
    net_percentage
  });
}
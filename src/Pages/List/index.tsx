import React, { useEffect, useMemo, useState } from 'react';
/* import { uuid } from 'uuidv4'; */
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';
import { Container, Content, Filters } from './styles';

/* import { Title } from '../../components/Aside/styles';
import formatCurrency from '../../utils/formatCurrency';
 */
interface IRoutesParams {
  match: {
    params: {
      type: string;
    };
  };
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRoutesParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

  const [frequencyFilterSelected, setFrequencyFilterSelected] = useState([
    'recorrente',
    'eventual'
  ]);

  /* console.log('data: ', data); */

  const movimentType = match.params.type;

  /*   const title = useMemo(() => {
    return movimentType === 'entry-balance' ? 'Entradas' : 'Saídas';
  }, [movimentType]);
 */
  /*   exemplo de useMemo
  const lineColor = useMemo(() => {
    return movimentType === 'entry-balance' ? '#f79318' : '#E44C4E';
  }, [movimentType]); */

  /*  Exemplo useMemo com 2 atributos/fucoes/parametros
  const title = useMemo(() => {
    return type === 'entry-balance'
      ? {
          title: 'Entradas',
          lineColor: '#f79318'
        }
      : {
          title: 'Saídas',
          lineColor: '#E44C4E'
        };
  }, [type]); */

  const pageData = useMemo(() => {
    return movimentType === 'entry-balance'
      ? {
          title: 'Entradas',
          lineColor: '#f79318',
          data: gains
        }
      : {
          title: 'Saídas',
          lineColor: '#E44C4E',
          data: expenses
        };
  }, [movimentType]);

  /*   const years = [
    { value: '2021', label: 2021 },
    { value: '2020', label: 2020 },
    { value: '2019', label: 2019 }
  ]; */

  const years = useMemo(() => {
    let uniqueYears: number[] = [];
    const { data } = pageData;
    data.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year
      };
    });
  }, [pageData]);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month
      };
    });
  }, []);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyFilterSelected.findIndex(
      (item) => item === frequency
    );
    if (alreadySelected >= 0) {
      const filtered = frequencyFilterSelected.filter(
        (item) => item !== frequency
      );
      setFrequencyFilterSelected(filtered);
    } else {
      setFrequencyFilterSelected((prev) => [...prev, frequency]);
    }
  };

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error('invalid month value. Is accept 0 - 24');
    }
  };

  const handleYearSelected = (month: string) => {
    try {
      const parseYear = Number(month);
      setYearSelected(parseYear);
    } catch (error) {
      throw new Error('invalid year value. Is accept 0 - 24');
    }
  };

  useEffect(() => {
    const { data } = pageData;
    const filteredData = data.filter((item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return (
        month === monthSelected &&
        year === yearSelected &&
        frequencyFilterSelected.includes(item.frequency)
      );
    });

    const formattedData = filteredData.map((item) => {
      return {
        id: String(new Date().getTime()) + item.amount,
        /* id: uuid(), */
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
      };
    });
    setData(formattedData);
  }, [
    pageData,
    monthSelected,
    yearSelected,
    data.length,
    frequencyFilterSelected
  ]);

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>
      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent ${
            frequencyFilterSelected.includes('recorrente') && 'tag-actived'
          }`}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>
        <button
          type="button"
          className={`tag-filter tag-filter-eventual  ${
            frequencyFilterSelected.includes('eventual') && 'tag-actived'
          }`}
          onClick={() => handleFrequencyClick('eventual')}
        >
          Eventuais
        </button>
      </Filters>
      <Content>
        {data.map((item) => (
          <HistoryFinanceCard
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dateFormatted}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
